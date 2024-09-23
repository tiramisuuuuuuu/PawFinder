const {
	createUserEntry,
	verifyUser,
	getUserInfo,
	changeUserElement,
} = require("./scripts/authentication");

const {
	createNewBadge,
	addBadgeToUser,
	getUserBadgeObjects,
} = require("./scripts/badges");

const {
	createPetProfile,
	returnPetProfiles,
	nearbyPetProfiles,
	retrievePetProfile,
} = require("./scripts/petprofile");

const {
	createSighting,
	returnSightings,
	retrieveNearbySightings,
	appendTaggedProfile,
} = require("./scripts/sightings");

const { returnLocation } = require("./google/maps");

const {
	addOneAvatar,
	editUserAvatar,
	changeUserAvatar,
	getAllAvatars,
} = require("./scripts/avatars");

function tester(req, res) {
	// Controller logic goes here
	res.send("Hello from tester!");
}

async function addUser(req, res) {
	result = await createUserEntry(
		req.body.username,
		req.body.email,
		req.body.password,
		req.body.confirmPassword
	);
	res.send(result);
}

async function authenticateUser(req, res) {
	result = await verifyUser(req.body.username, req.body.password);
	res.send(result);
}

async function getUser(req, res) {
	result = await getUserInfo(req.body.userToken);
	res.send(result);
}

async function editUserField(req, res) {
	result = await changeUserElement(
		req.body.userToken,
		req.body.element,
		req.body.newValue
	);
	res.send(result);
}

async function addBadge(req, res) {
	result = await createNewBadge(req.body.badgeName, req.file);
	res.send(result);
}

async function addUserBadge(req, res) {
	result = await addBadgeToUser(req.body.userToken, req.body.badgeToken);
	res.send(result);
}

async function getUserBadges(req, res) {
	result = await getUserBadgeObjects(req.body.userToken);
	res.send(result);
}

async function addPetProfile(req, res) {
	result = await createPetProfile(
		req.body.userToken,
		req.body.username,
		req.body.contact,
		req.body.petName,
		req.body.petBreed,
		req.body.lastSeen,
		req.body.petDescription,
		req.body.assignedTasks,
		req.body.latitude,
		req.body.longitude,
		req.file
	);
	res.send(result);
}

async function getPetProfiles(req, res) {
	result = await returnPetProfiles(req.body.userToken);
	res.send(result);
}

async function getNearbyPetProfiles(req, res) {
	result = await nearbyPetProfiles(req.body.latitude, req.body.longitude);
	res.send(result);
}

async function getPetProfileByID(req, res) {
	result = await retrievePetProfile(req.body.petToken);
	res.send(result);
}

async function addSighting(req, res) {
	result = await createSighting(
		req.body.userToken,
		req.body.petTokens,
		req.files,
		req.body.description,
		req.body.location,
		req.body.latitude,
		req.body.longitude
	);
	res.send(result);
}

async function getSightings(req, res) {
	result = await returnSightings(req.body.userToken);
	res.send(result);
}

async function getNearbySightings(req, res) {
	result = await retrieveNearbySightings(req.body.latitude, req.body.longitude);
	res.send(result);
}

async function addTaggedProfile(req, res) {
	result = await appendTaggedProfile(
		req.body.sightingToken,
		req.body.petToken,
		req.body.userToken
	);
	res.send(result);
}

async function addAvatar(req, res) {
	result = await addOneAvatar(req.file);
	res.send(result);
}

async function setUserAvatar(req, res) {
	result = await editUserAvatar(req.body.avatarToken, req.body.userToken);
	res.send(result);
}

async function getUserAvatar(req, res) {
	result = await changeUserAvatar(req.body.userToken);
	res.send(result);
}

async function getAvatars(req, res) {
	result = await getAllAvatars();
	res.send(result);
}

async function getLocation(req, res) {
	result = await returnLocation(req.body.latitude, req.body.longitude);
	res.send(result);
}

// Export the controller function
module.exports = {
	getUser,
	tester,
	addUser,
	authenticateUser,
	addBadge,
	addUserBadge,
	getUserBadges,
	editUserField,
	addPetProfile,
	getPetProfiles,
	getNearbyPetProfiles,
	getPetProfileByID,
	addSighting,
	getSightings,
	getNearbySightings,
	addTaggedProfile,
	addAvatar,
	setUserAvatar,
	getUserAvatar,
	getAvatars,
	getLocation,
};
