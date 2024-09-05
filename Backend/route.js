const express = require("express");
const multer = require("multer");
const path = require("path");
const {
	tester,
	addUser,
	authenticateUser,
	addBadge,
	addUserBadge,
	getUserBadges,
} = require("./controller.js");

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage });

/**
 * Tests if connected to backend
 * @returns success string
 */
router.get("/", tester);

/**
 * Adds username to database
 * @
 * @param username - username of user
 * @param password - password of user
 * @returns success string or error
 */
router.post("/addUser", addUser);

/**
 * Checks if username/password combo is in database
 * @param username - username of user
 * @param password - password of user
 * @returns success string or error
 */
router.post("/authenticateUser", authenticateUser);

/**
 * Adds a new badge type to the database
 * @param badgeName - name of badge
 * @param badgePicture - picture of badge
 * @returns success string or error
 */
router.post("/addBadge", upload.single("badgeImage"), addBadge);

/**
 * Adds a badge to the user
 * @param username - name of user
 * @param badgeName - name of badge
 * @returns success string or error
 */
router.post("/addUserBadge", addUserBadge);

/**
 * Gets all the badges of an user
 * @param
 */
router.post("/getUserBadges", getUserBadges);

module.exports = router;
