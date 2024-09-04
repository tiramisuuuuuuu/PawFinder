const {
	createUserEntry,
	verifyUser,
} = require("./Authentication/authentication");

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

// Export the controller function
module.exports = {
	tester,
	addUser,
	authenticateUser,
};
