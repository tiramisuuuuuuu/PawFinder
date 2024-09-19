// MongoDB
const { MongoClient } = require("mongodb");

let client;
async function databaseConnection() {
	if (!client) {
		const url =
			"mongodb+srv://admin:admin@petfinder.h236iki.mongodb.net/?retryWrites=true&w=majority&appName=PetFinder";
		client = new MongoClient(url);
		await client.connect();
		return client;
	} else {
		return client;
	}
}

async function getClient() {
	return await databaseConnection();
}

// Firebase Storage
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
require("dotenv").config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp, "gs://pawfinder-1f103.appspot.com");

module.exports = {
	getClient,
	storage,
};
