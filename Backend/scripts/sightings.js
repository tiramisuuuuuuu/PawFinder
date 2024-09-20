const { getClient, storage } = require("./storageServices");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");
const { mongoose } = require("mongoose");

// HELPER FUNCTIONS
async function getPhotoUrls(photos) {
	const urls = [];
	for (const photo of photos) {
		const imageBuffer = fs.readFileSync(photo.path);
		const uint8Array = new Uint8Array(imageBuffer);
		const photoRef = ref(storage, `sightings/${photo.filename}`);
		await uploadBytes(photoRef, uint8Array);
		const url = await getDownloadURL(photoRef);
		urls.push(url);
	}
	return urls;
}

// MAIN FUNCTIONS
async function createSighting(
	userToken,
	petToken,
	photos,
	description,
	location
) {
	const client = await getClient();
	const repsonse = {};
	const requiredFields = [userToken, petToken, photos, description, location];
	if (requiredFields.includes(undefined) || requiredFields.includes(null)) {
		response.error = "Missing one or more parameters.";
		return response;
	}

	const database = client.db("petfinder");
	const sightings = database.collection("sightings");
	const date = new Date().toLocaleDateString();
	const urls = await getPhotoUrls(photos);
	const sighting = {
		userToken: userToken,
		petID: petToken,
		photos: urls,
		description: description,
		location: location,
		date: date,
	};
	const sightingObj = await sightings.insertOne(sighting);
	response.token = sightingObj.insertedId;
	return response;
}

async function returnSightings(userToken) {
	const client = await getClient();
	const response = {};
	const database = client.db("petfinder");
	const users = database.collection("users");
	const sightings = database.collection("sightings");

	const user = await users.findOne({
		_id: new mongoose.Types.ObjectId(userToken),
	});
	if (!user) {
		response.error = "No user with the username found.";
		return response;
	}

	const sightingObjects = await sightings
		.find({ userToken: userToken })
		.toArray();
	return sightingObjects;
}

module.exports = {
	createSighting,
	returnSightings,
};
