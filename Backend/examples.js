const addUser = async (usr, pwd) => {
	await fetch("http://localhost:4000/addUser/", {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: usr,
			password: pwd,
		}),
	})
		.then((response) => {
			return response.text();
		})
		.then((message) => console.log(message));
};

const authenticateUser = async (usr, pwd) => {
	await fetch("http://localhost:4000/authenticateUser/", {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: usr,
			password: pwd,
		}),
	})
		.then((response) => {
			return response.text();
		})
		.then((message) => console.log(message));
};

const run = async () => {
	let usr = "grace";
	let pwd = "mochi";
	await addUser(usr, pwd);
	await authenticateUser(usr, pwd);
};

run();
