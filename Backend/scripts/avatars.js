const { getClient, storage } = require("./storageServices");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");
const { mongoose } = require("mongoose");

// HELPER FUNCTIONS
async function addAvatarToDatabase(badgeImageURL) {
	const client = await getClient();
	const avatar = { avatarImageURL: badgeImageURL };
	const database = client.db("petfinder");
	const avatars = database.collection("avatars");
	await avatars.insertOne(avatar);
}

async function getAvatarURL(avatarToken) {
	const client = await getClient();
	const database = client.db("petfinder");
	const avatars = database.collection("avatars");
	const avatar = await avatars.findOne({
		_id: new mongoose.Types.ObjectId(avatarToken),
	});
	return avatar.avatarImageURL;
}

// MAIN FUNCTIONS
async function addOneAvatar(avatarImg) {
	const client = await getClient();
	const response = {};
	if (!avatarImg) {
		response.error = "Missing one or more parameters.";
		return response;
	}
	const imageBuffer = fs.readFileSync(avatarImg.path);
	const uint8Array = new Uint8Array(imageBuffer);
	const avatarRef = ref(storage, `avatars/${avatarImg.filename}`);
	await uploadBytes(avatarRef, uint8Array);
	const url = await getDownloadURL(avatarRef);
	await addAvatarToDatabase(url);
	response.success = "Successfully added avatar!";
	return response;
}

async function editUserAvatar(avatarToken, userToken) {
	const client = await getClient();
	const response = {};
	const database = client.db("petfinder");
	const users = database.collection("users");
	const user = await users.findOne({
		_id: new mongoose.Types.ObjectId(userToken),
	});
	if (!user) {
		response.error = "No user with the username found.";
		return response;
	}
	await users.updateOne(
		{ _id: new mongoose.Types.ObjectId(userToken) },
		{ $set: { avatar: avatarToken } }
	);
	response.success = "Edited avatar for user";
	return response;
}

async function changeUserAvatar(userToken) {
	const client = await getClient();
	const response = {};
	const database = client.db("petfinder");
	const users = database.collection("users");
	const user = await users.findOne({
		_id: new mongoose.Types.ObjectId(userToken),
	});
	if (!user) {
		response.error = "No user with the username found.";
		return response;
	}
	const avatarURL = await getAvatarURL(user.avatar);
	response.url = avatarURL;

	return response;
}

async function getAllAvatars() {
	const client = await getClient();
	const database = client.db("petfinder");
	const avatars = database.collection("avatars");
	const result = await avatars.find({}).toArray();
	return result;
}

module.exports = {
	addOneAvatar,
	editUserAvatar,
	changeUserAvatar,
	getAllAvatars,
};
