const express = require("express");
const cors = require("cors");
const app = express();

//establish a server who listens and responds through http requests
app.use(cors());
app.use(express.json());
const router = require("./route");

app.use(router);
app.listen(4000, () => {
	console.log(`Server is running on port 4000.`);
});

//set up client to connect to mongodb
