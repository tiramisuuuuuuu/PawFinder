const { client } = require("./storageServices");
const bcrypt = require("bcrypt");

// HELPER FUNCTIONS
async function getUser(users, username) {
	const document = await users.findOne({ username: username });
	return document;
}

async function encryptPassword(password) {
	const saltRounds = 10;
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds, function (err, hash) {
			if (err) {
				reject(err);
			} else {
				resolve(hash);
			}
		});
	});
}

async function verifyPassword(inputPassword, hashedPassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

// MAIN FUNCTIONS
async function verifyUser(username, password) {
	const response = {};
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const user = await getUser(users, username);
	if (user === null) {
		response.error = "User does not exist. Create a new account.";
		return response;
	}
	const passwordValid = await verifyPassword(password, user.password);
	if (passwordValid) {
		response.token = user._id.toString();
		return response;
	} else {
		response.error = "Invalid password. Please try again";
		return response;
	}
}

async function createUserEntry(username, password) {
	const response = {};
	await client.connect();
	const database = client.db("petfinder");
	const users = database.collection("users");
	const userObj = await getUser(users, username);
	if (userObj) {
		response.error = "User aleady exist. Choose a different username.";
		return response;
	}
	const hashedPassword = await encryptPassword(password);
	const user = { username: username, password: hashedPassword, badges: [] };
	const inserted = await users.insertOne(user);
	response.token = inserted.insertedId;
	await client.close();
	return response;
}

module.exports = {
	createUserEntry,
	verifyUser,
};
