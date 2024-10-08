const express = require("express");
const cors = require("cors");
const app = express();
const { deleteStaleImages } = require("./scripts/cleanup");

setInterval(deleteStaleImages, 10 * 1000);
// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

// Import and use the router
const router = require("./route");

app.use(router);

// Start server
app.listen(4000, '0.0.0.0', () => {
	console.log(`Server is running on port 4000.`);
});
