const { client, storage } = require("../storageServices");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");

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
	console.log("urls", urls);
	return urls;
}

// MAIN FUNCTIONS
async function createSighting(username, petID, photos, description, location) {
	const requiredFields = [username, petID, photos, description, location];
	if (requiredFields.includes(undefined) || requiredFields.includes(null)) {
		return "Missing one or more parameters.";
	}

	await client.connect();
	const database = client.db("petfinder");
	const sightings = database.collection("sightings");
	const date = new Date().toLocaleDateString();
	const urls = await getPhotoUrls(photos);
	const sighting = {
		username: username,
		petID: petID,
		photos: urls,
		description: description,
		location: location,
		date: date,
	};
	await sightings.insertOne(sighting);
	await client.close();
	return `Sighting has been added to the database.`;
}

async function returnSightings(username) {
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const sightings = database.collection("sightings");

	const user = await users.findOne({ username: username });
	if (!user) {
		return "No user with the username found.";
	}

	const sightingObjects = await sightings
		.find({ username: username })
		.toArray();
	await client.close();
	return sightingObjects;
}

module.exports = {
	createSighting,
	returnSightings,
};
