// MongoDB
const { MongoClient } = require("mongodb");

const url =
	"mongodb+srv://admin:admin@petfinder.h236iki.mongodb.net/?retryWrites=true&w=majority&appName=PetFinder";
const client = new MongoClient(url);

// Firebase Storage
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
	apiKey: "AIzaSyBQuUeDg6HdBvyjQr090EIqZwVL_ETOFwE",
	authDomain: "pawfinder-1f103.firebaseapp.com",
	projectId: "pawfinder-1f103",
	storageBucket: "pawfinder-1f103.appspot.com",
	messagingSenderId: "244734255414",
	appId: "1:244734255414:web:b7bd014e7a4831ea83d397",
	measurementId: "G-78J4PSJNPQ",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = {
	client,
	storage,
};
