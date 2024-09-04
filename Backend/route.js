const router = require("express").Router();
const { tester, addUser, authenticateUser } = require("./controller.js");
router.get("/", tester);
router.post("/addUser", addUser);
router.post("/authenticateUser", authenticateUser);
module.exports = router;
