const { client, storage } = require("../storageServices");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");

// HELPER FUNCTIONS
async function addBadgeToDatabase(badgeName, badgeImageURL) {
	const badge = { badgeName: badgeName, badgeImageURL: badgeImageURL };
	await client.connect();
	const database = client.db("petfinder");
	const badges = database.collection("badges");
	await badges.insertOne(badge);
}

// MAIN FUNCTIONS
async function createNewBadge(badgeName, badgePicture) {
	if (!(badgeName && badgePicture)) {
		return "Missing one or more parameters.";
	}
	const imageBuffer = fs.readFileSync(badgePicture.path);
	const uint8Array = new Uint8Array(imageBuffer);
	const badgeRef = ref(storage, `badges/${badgePicture.filename}`);
	await uploadBytes(badgeRef, uint8Array);
	const url = await getDownloadURL(badgeRef);
	await addBadgeToDatabase(badgeName, url);
	return "Successfully inserted new badge.";
}

async function addBadgeToUser(username, badgeName) {
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const badges = database.collection("badges");

	const user = await users.findOne({ username: username });
	const badge = await badges.findOne({ badgeName: badgeName });

	if (!user || !badge) {
		return "Could not find either user or badge.";
	}

	await users.updateOne(
		{ username: username },
		{ $push: { badges: badgeName } }
	);
	return `Added badge ${badgeName} to user ${username}`;
}

async function getUserBadgeObjects(username) {
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const badges = database.collection("badges");

	const user = await users.findOne({ username: username });
	if (!user) {
		return "No user with the username found.";
	}

	badgeObjects = [];
	for (const badgeName of user.badges) {
		badge = await badges.findOne({ badgeName: badgeName });
		badgeObjects.push(badge);
	}

	return badgeObjects;
}

module.exports = {
	createNewBadge,
	addBadgeToUser,
	getUserBadgeObjects,
};
