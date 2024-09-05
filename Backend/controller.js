const {
	createUserEntry,
	verifyUser,
} = require("./authentication/authentication");

const {
	createNewBadge,
	addBadgeToUser,
	getUserBadgeObjects,
} = require("./badges/badges");

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

// Export the controller function
module.exports = {
	tester,
	addUser,
	authenticateUser,
	addBadge,
	addUserBadge,
	getUserBadges,
};
