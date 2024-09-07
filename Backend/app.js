const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

// Import and use the router
const router = require("./route");

app.use(router);

// Start server
app.listen(4000, () => {
	console.log(`Server is running on port 4000.`);
});
