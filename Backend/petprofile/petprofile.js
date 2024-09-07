const { client } = require("../storageServices");

async function createPetProfile(
	username,
	petName,
	petSpecies,
	lastSeen,
	petDescription,
	assignedTasks
) {
	const requiredFields = [
		username,
		petName,
		petSpecies,
		lastSeen,
		petDescription,
		assignedTasks,
	];
	if (requiredFields.includes(undefined) || requiredFields.includes(null)) {
		return "Missing one or more parameters.";
	}
	await client.connect();
	const database = client.db("petfinder");
	const petprofiles = database.collection("petprofiles");
	const date = new Date().toLocaleDateString();
	const pet = {
		username: username,
		petName: petName,
		petSpecies: petSpecies,
		posted: date,
		lastSeen: lastSeen,
		petDescription: petDescription,
		assignedTasks: assignedTasks,
	};
	await petprofiles.insertOne(pet);
	await client.close();
	return `Pet ${petName} has been added to the database.`;
}

async function returnPetProfiles(username) {
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const petprofiles = database.collection("petprofiles");

	const user = await users.findOne({ username: username });
	if (!user) {
		return "No user with the username found.";
	}

	const petProfileObjects = await petprofiles
		.find({ username: username })
		.toArray();
	await client.close();
	return petProfileObjects;
}

module.exports = {
	createPetProfile,
	returnPetProfiles,
};
