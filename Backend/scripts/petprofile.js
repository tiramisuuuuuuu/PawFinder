const { getClient, storage } = require("./storageServices");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { mongoose } = require("mongoose");
const fs = require("fs");

// HELPER FUNCTIONS
async function getPhotoUrl(photo) {
	const imageBuffer = fs.readFileSync(photo.path);
	const uint8Array = new Uint8Array(imageBuffer);
	const photoRef = ref(storage, `sightings/${photo.filename}`);
	await uploadBytes(photoRef, uint8Array);
	const url = await getDownloadURL(photoRef);
	return url;
}

// MAIN FUNCTIONS
async function createPetProfile(
	userToken,
	username,
	contact,
	petName,
	petBreed,
	lastSeen,
	petDescription,
	assignedTasks,
	petImage
) {
	const client = await getClient();
	const response = {};
	const requiredFields = [
		userToken,
		username,
		contact,
		petName,
		petBreed,
		lastSeen,
		petDescription,
		assignedTasks,
		petImage,
	];
	if (requiredFields.includes(undefined) || requiredFields.includes(null)) {
		response.error = "Missing one or more parameters.";
		return repsonse;
	}
	const database = client.db("petfinder");
	const petprofiles = database.collection("petprofiles");
	const date = new Date().toLocaleDateString();
	const imageUrl = await getPhotoUrl(petImage);
	const pet = {
		userToken: userToken,
		username: username,
		contact: contact,
		petName: petName,
		petBreed: petBreed,
		postedDate: date,
		lastSeen: lastSeen,
		petDescription: petDescription,
		assignedTasks: assignedTasks,
		photoUrl: imageUrl,
	};
	const petObj = await petprofiles.insertOne(pet);
	response.token = petObj.insertedId;
	return response;
}

async function returnPetProfiles(userToken) {
	const client = await getClient();
	const response = {};
	const database = client.db("petfinder");
	const users = database.collection("users");
	const petprofiles = database.collection("petprofiles");

	const user = await users.findOne({
		_id: new mongoose.Types.ObjectId(userToken),
	});
	if (!user) {
		response.error = "No user with the username found.";
		return response;
	}

	const petProfileObjects = await petprofiles
		.find({ userToken: userToken })
		.toArray();
	return petProfileObjects;
}

async function nearbyPetProfiles(longitude, latitude) {
	// TODO: Filter by location instead of returning all pet profiles
	const client = await getClient();
	const database = client.db("petfinder");
	const petprofiles = database.collection("petprofiles");

	const petProfileObjects = await petprofiles.find({}).toArray();
	petProfileObjects.map((petProfile) => {
		delete petProfile.userToken;
	});
	return petProfileObjects;
}

async function retrievePetProfile(petToken) {
	const client = await getClient();
	const database = client.db("petfinder");
	const petprofiles = database.collection("petprofiles");

	const petProfile = await petprofiles.findOne({
		_id: new mongoose.Types.ObjectId(petToken),
	});
	delete petProfile.userToken;
	return petProfile;
}

module.exports = {
	createPetProfile,
	returnPetProfiles,
	nearbyPetProfiles,
	retrievePetProfile,
};
