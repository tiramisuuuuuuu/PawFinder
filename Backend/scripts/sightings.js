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
	location,
	latitude,
	longitude
) {
	const client = await getClient();
	const response = {};
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
		latitude: latitude,
		longitude: longitude,
		taggedProfiles: {},
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

async function retrieveNearbySightings(latitude, longitude) {
	// TODO: update to get nearby sightings not all
	const client = await getClient();
	const database = client.db("petfinder");
	const sightings = database.collection("sightings");

	const sightingObjects = await sightings.find({}).toArray();
	return sightingObjects;
}

async function appendTaggedProfile(sightingToken, petToken, userToken) {
	console.log("heeeeere")
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
