const {
	createUserEntry,
	verifyUser,
} = require("./authentication/authentication");

const {
	createNewBadge,
	addBadgeToUser,
	getUserBadgeObjects,
} = require("./badges/badges");

const {
	createPetProfile,
	returnPetProfiles,
} = require("./petprofile/petprofile");

const { createSighting, returnSightings } = require("./sightings/sightings");

function tester(req, res) {
	// Controller logic goes here
	res.send("Hello from tester!");
}

async function addUser(req, res) {
	result = await createUserEntry(req.body.username, req.body.password);
	res.send(result);
}

async function authenticateUser(req, res) {
	result = await verifyUser(req.body.username, req.body.password);
	res.send(result);
}

async function addBadge(req, res) {
	result = await createNewBadge(req.body.badgeName, req.file);
	res.send(result);
}

async function addUserBadge(req, res) {
	result = await addBadgeToUser(req.body.username, req.body.badgeName);
	res.send(result);
}

async function getUserBadges(req, res) {
	result = await getUserBadgeObjects(req.body.username, req.body.badgeName);
	res.send(result);
}

async function addPetProfile(req, res) {
	result = await createPetProfile(
		req.body.username,
		req.body.petName,
		req.body.petSpecies,
		req.body.lastSeen,
		req.body.petDescription,
		req.body.assignedTasks
	);
	res.send(result);
}

async function getPetProfiles(req, res) {
	result = await returnPetProfiles(req.body.username);
	res.send(result);
}

async function addSighting(req, res) {
	result = await createSighting(
		req.body.username,
		req.body.petID,
		req.files,
		req.body.description,
		req.body.location
	);
	res.send(result);
}

async function getSightings(req, res) {
	result = await returnSightings(req.body.username);
	res.send(result);
}

// Export the controller function
module.exports = {
	tester,
	addUser,
	authenticateUser,
	addBadge,
	addUserBadge,
	getUserBadges,
	addPetProfile,
	getPetProfiles,
	addSighting,
	getSightings,
};
