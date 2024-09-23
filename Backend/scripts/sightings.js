const { getClient, storage } = require("./storageServices");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");
const { mongoose } = require("mongoose");

// HELPER FUNCTIONS
async function getPhotoUrl(sightingImg) {
	const imageBuffer = Buffer.from(sightingImg, "base64");
	const uint8Array = new Uint8Array(imageBuffer);
	const timestamp = Date.now();
	const photoRef = ref(storage, `sightings/${timestamp}.png`);
	await uploadBytes(photoRef, uint8Array);
	const url = await getDownloadURL(photoRef);
	return url;
}

// MAIN FUNCTIONS
async function createSighting(
	userToken,
	petTokens,
	sightingImg,
	description,
	location,
	latitude,
	longitude
) {
	const client = await getClient();
	const response = {};
	const requiredFields = [
		userToken,
		petTokens,
		sightingImg,
		description,
		location,
		latitude,
		longitude,
	];
	if (requiredFields.includes(undefined) || requiredFields.includes(null)) {
		response.error = "Missing one or more parameters.";
		return response;
	}

	const petTokenArray = JSON.parse(petTokens);
	const database = client.db("petfinder");
	const sightings = database.collection("sightings");
	const date = new Date().toLocaleDateString();
	const url = await getPhotoUrl(sightingImg);
	const sighting = {
		sightingImg: url,
		description: description,
		location: location,
		latitude: latitude,
		longitude: longitude,
		taggedProfiles: {},
		date: date,
	};
	const sightingObj = await sightings.insertOne(sighting);
	response.token = sightingObj.insertedId;
	for (const petToken of petTokenArray) {
		await appendTaggedProfile(response.token, petToken, userToken);
	}
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

async function retrieveNearbySightings(latitude, longitude) {
	// TODO: update to get nearby sightings not all
	const client = await getClient();
	const database = client.db("petfinder");
	const sightings = database.collection("sightings");

	const sightingObjects = await sightings.find({}).toArray();
	return sightingObjects;
}

async function appendTaggedProfile(sightingToken, petToken, userToken) {
	const response = {};
	const client = await getClient();
	const database = client.db("petfinder");
	const sightings = database.collection("sightings");
	await sightings.updateOne(
		{ _id: new mongoose.Types.ObjectId(sightingToken) },
		{
			$setOnInsert: { taggedProfiles: {} },
		},
		{ upsert: false }
	);
	await sightings.updateOne(
		{ _id: new mongoose.Types.ObjectId(sightingToken) },
		{
			$push: { [`taggedProfiles.${petToken}`]: userToken },
		}
	);
	response.success = "Sucessfully added tagged profile to sighting";
	return response;
}

module.exports = {
	createSighting,
	returnSightings,
	retrieveNearbySightings,
	appendTaggedProfile,
};
