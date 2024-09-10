const { client, storage } = require("../storageServices");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");
const { mongoose } = require("mongoose");

// HELPER FUNCTIONS
async function addBadgeToDatabase(badgeName, badgeImageURL) {
	const badge = { badgeName: badgeName, badgeImageURL: badgeImageURL };
	await client.connect();
	const database = client.db("petfinder");
	const badges = database.collection("badges");
	const badgeObj = await badges.insertOne(badge);
	return badgeObj.insertedId;
}

// MAIN FUNCTIONS
async function createNewBadge(badgeName, badgePicture) {
	const response = {};
	if (!(badgeName && badgePicture)) {
		response.error = "Missing one or more parameters.";
		return response;
	}
	const imageBuffer = fs.readFileSync(badgePicture.path);
	const uint8Array = new Uint8Array(imageBuffer);
	const badgeRef = ref(storage, `badges/${badgePicture.filename}`);
	await uploadBytes(badgeRef, uint8Array);
	const url = await getDownloadURL(badgeRef);
	const badgeToken = await addBadgeToDatabase(badgeName, url);
	response.token = badgeToken;
	return response;
}

async function addBadgeToUser(userToken, badgeToken) {
	const response = {};
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const badges = database.collection("badges");

	const user = await users.findOne({
		_id: new mongoose.Types.ObjectId(userToken),
	});
	const badge = await badges.findOne({
		_id: new mongoose.Types.ObjectId(badgeToken),
	});

	if (!user || !badge) {
		response.error = "Could not find either user or badge.";
		return response;
	}

	await users.updateOne(
		{ _id: new mongoose.Types.ObjectId(userToken) },
		{ $push: { badges: badgeToken } }
	);
	response.success = "Badge successfully added to user.";
	return response;
}

async function getUserBadgeObjects(userToken) {
	response = {};
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const badges = database.collection("badges");

	const user = await users.findOne({
		_id: new mongoose.Types.ObjectId(userToken),
	});
	if (!user) {
		response.error = "No user with the username found.";
		return response;
	}

	badgeObjects = [];
	for (const badgeToken of user.badges) {
		badge = await badges.findOne({
			_id: new mongoose.Types.ObjectId(badgeToken),
		});
		badgeObjects.push(badge);
	}

	return badgeObjects;
}

module.exports = {
	createNewBadge,
	addBadgeToUser,
	getUserBadgeObjects,
};
