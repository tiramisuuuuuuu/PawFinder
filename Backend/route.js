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
	addPetProfile,
	getPetProfiles,
	addSighting,
	getSightings,
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
 * @paramtype raw json
 * @returns success string
 */
router.get("/", tester);

/**
 * Adds username to database
 * @paramtype raw json
 * @param username - username of user
 * @param password - password of user
 * @returns user token or error
 */
router.post("/addUser", addUser);

/**
 * Checks if username/password combo is in database
 * @paramtype raw json
 * @param username - username of user
 * @param email - email of user
 * @param password - password of user
 * @param confirmPassword - second password input from user
 * @returns user token or error
 */
router.post("/authenticateUser", authenticateUser);

/**
 * Adds a new badge type to the database
 * @paramtype form data
 * @param badgeName - name of badge
 * @param badgeImage - picture of badge
 * @returns badge token or error
 */
router.post("/addBadge", upload.single("badgeImage"), addBadge);

/**
 * Adds a badge to the user
 * @paramtype raw json
 * @param userToken - token of user
 * @param badgeToken - token of badge to add
 * @returns success or error
 */
router.post("/addUserBadge", addUserBadge);

/**
 * Gets all the badges of an user
 * @paramtype raw json
 * @param userToken - token of user
 * @returns array of badge objects or error
 */
router.post("/getUserBadges", getUserBadges);

/**
 * Add missing pet profile
 * @paramtype raw json
 * @param userToken - token of user that's adding the profile
 * @param petName - name of pet
 * @param petSpecies - species of pet
 * @param lastSeen - location the pet was last seen
 * @param petDescription - description of the pet
 * @param assignedTasks - tasks assigned
 * @returns pet profile token
 */
router.post("/addPetProfile", addPetProfile);

/**
 * Gets all the pet profiles attached to the user
 * @paramtype raw json
 * @param userToken - token of user to get the pet profiles of
 * @returns List of pet profile objects or error
 */
router.post("/getPetProfiles", getPetProfiles);

/**
 * Adds a sighting of a pet
 * @paramtype form data
 * @param userToken - token of user that is adding the sighting
 * @param petToken - the id of the pet the sighting is for
 * @param photos - photos of the sighting
 * @param description - description of the sighting
 * @param location - location of where sighting occured
 * @returns - Success or error message
 */
router.post("/addSighting", upload.array("photos", 10), addSighting);

/**
 * Gets sightings of a user
 * @paramtype raw json
 * @param userToken - token of user to get sightings of
 * @returns - list of sighting objects
 */
router.post("/getSightings", getSightings);

module.exports = router;
