const { getClient } = require("./storageServices");
const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const { getAllAvatars } = require("./avatars");

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

async function defaultAvatar() {
	avatars = await getAllAvatars();
	return avatars[0]._id;
}

// MAIN FUNCTIONS
async function verifyUser(username, password) {
	const client = await getClient();
	const response = {};
	const requiredFields = [username, password];
	if (
		requiredFields.includes(undefined) ||
		requiredFields.includes(null) ||
		requiredFields.includes("")
	) {
		response.error = "Missing one or more parameters.";
		return response;
	}
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

async function createUserEntry(username, email, password, confirmPassword) {
	const client = await getClient();
	const response = {};
	const requiredFields = [username, email, password, confirmPassword];
	if (
		requiredFields.includes(undefined) ||
		requiredFields.includes(null) ||
		requiredFields.includes("")
	) {
		response.error = "Missing one or more parameters.";
		return response;
	}
	if (password !== confirmPassword) {
		response.error = "Password and confirm password does not match.";
		return response;
	}
	const database = client.db("petfinder");
	const users = database.collection("users");
	const userObj = await getUser(users, username);
	if (userObj) {
		response.error = "User aleady exist. Choose a different username.";
		return response;
	}
	const hashedPassword = await encryptPassword(password);
	const avatar = await defaultAvatar();
	const user = {
		username: username,
		email: email,
		password: hashedPassword,
		badges: [],
		avatar: avatar.toString(),
	};
	const inserted = await users.insertOne(user);
	response.token = inserted.insertedId;
	return response;
}

async function getUserInfo(userToken) {
	const client = await getClient();
	const response = {};
	const database = client.db("petfinder");
	const users = database.collection("users");
	const user = await users.findOne({
		_id: new mongoose.Types.ObjectId(userToken),
	});
	if (!user) {
		response.error = "No user with the username found.";
		return response;
	}
	return user;
}

module.exports = {
	createUserEntry,
	verifyUser,
	getUserInfo,
};
