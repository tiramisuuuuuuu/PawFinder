const express = require("express");
const multer = require("multer");
const path = require("path");
const {
	tester,
	addUser,
	authenticateUser,
	getUser,
	addBadge,
	addUserBadge,
	getUserBadges,
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
 * @param email - email of user
 * @param password - password of user
 * @param confirmPassword - second password input from user
 * @returns user token or error
 */
router.post("/addUser", addUser);

/**
 * Checks if username/password combo is in database
 * @paramtype raw json
 * @param username - username of user
 * @param password - password of user
 * @returns user token or error
 */
router.post("/authenticateUser", authenticateUser);

/**
 * Gets the user corresponding to the user token
 * @paramtype raw json
 * @param userToken - user token
 * @returns user object corresponding to user token
 */
router.post("/getUser", getUser);

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
 * @paramtype form data
 * @param userToken - token of pet owner
 * @param username - username of pet owner
 * @param contact - contact info of pet owner
 * @param petName - name of pet
 * @param petBreed - pet breed
 * @param lastSeen - location the pet was last seen
 * @param petDescription - description of the pet
 * @param assignedTasks - tasks assigned
 * @param petImage - image of the lost pet
 * @param longitude - longitude of owner
 * @param latitude - latitude of owner
 * @returns pet profile token
 */
router.post("/addPetProfile", upload.single("petImage"), addPetProfile);

/**
 * Gets all the pet profiles attached to the user
 * @paramtype raw json
 * @param userToken - token of user to get the pet profiles of
 * @returns List of pet profile objects or error
 */
router.post("/getPetProfiles", getPetProfiles);

/**
 * Get nearby pet profiles
 * @paramtype raw json
 * @param latitude - latitude of user location
 * @param longitude - longitude of user location
 * @returns List of pet profile objects without user token
 */
router.post("/getNearbyPetProfiles", getNearbyPetProfiles);

/**
 * Get pet profiles by ID
 * @paramtype raw json
 * @param petToken - token of pet profile
 * @returns Pet Profile Objects
 */
router.post("/getPetProfileByID", getPetProfileByID);

/**
 * Adds a sighting of a pet
 * @paramtype form data
 * @param userToken - token of user that is adding the sighting
 * @param petToken - the id of the pet the sighting is for
 * @param photos - photos of the sighting
 * @param description - description of the sighting
 * @param location - location of where sighting occured
 * @param latitude - latitude of location
 * @param longitude - longitude of location
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

/**
 * Get nearby sightings of a user
 * @paramtype raw json
 * @param latitude - latitude of the user
 * @param longitude - longitude of the user
 * @returns - list of sighting objects nearby
 */
router.post("/getNearbySightings", getNearbySightings);

/**
 * Adds one avatar to the database
 * @paramtype form data
 * @param avatarImg - image of the avatar
 * @returns - Success message or error message
 */
router.post("/addAvatar", upload.single("avatarImg"), addAvatar);

/**
 * Add a tagged profile to a pet profile
 * @paramtype raw json
 * @param sightingToken - sightings to add tagged profile to
 * @param petToken - pet associated with sighting
 * @param userToken - user that added the tag
 */
router.post("/addTaggedProfile", addTaggedProfile);

/**
 * Set user avatar
 * @paramtype raw json
 * @param avatarToken - token of avatar
 * @param userToken - token of user to add avatar
 * @returns - Success or error message
 */
router.post("/setUserAvatar", setUserAvatar);

/**
 * Get user avatar image url for the user
 * @paramtype raw json
 * @param uesrToken - token of the user
 * @returns - Image url or error message
 */
router.post("/getUserAvatar", getUserAvatar);

/**
 * Returns the name and image of all the avatars
 * @returns - list of all avatar objects
 */
router.get("/getAvatars", getAvatars);

/** Gets nearest location of given lat and lang
 * @paramtype raw json
 * @param latitude - latitude as a type number
 * @param longitude - longitude as a type number
 * @returns - a place
 */
router.post("/getLocation", getLocation);

module.exports = router;
