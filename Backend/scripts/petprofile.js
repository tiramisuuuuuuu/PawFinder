const { getClient } = require("./storageServices");
const { mongoose } = require("mongoose");

async function createPetProfile(
	userToken,
	petName,
	petSpecies,
	lastSeen,
	petDescription,
	assignedTasks
) {
	const client = await getClient();
	const response = {};
	const requiredFields = [
		userToken,
		petName,
		petSpecies,
		lastSeen,
		petDescription,
		assignedTasks,
	];
	if (requiredFields.includes(undefined) || requiredFields.includes(null)) {
		response.error = "Missing one or more parameters.";
		return repsonse;
	}
	const database = client.db("petfinder");
	const petprofiles = database.collection("petprofiles");
	const date = new Date().toLocaleDateString();
	const pet = {
		userToken: userToken,
		petName: petName,
		petSpecies: petSpecies,
		posted: date,
		lastSeen: lastSeen,
		petDescription: petDescription,
		assignedTasks: assignedTasks,
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

module.exports = {
	createPetProfile,
	returnPetProfiles,
};
