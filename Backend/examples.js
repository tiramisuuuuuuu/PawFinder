const addUser = (usr, pwd) => {
	console.log(usr);
	console.log(pwd);
	fetch("http://localhost:4000/addUser/", {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: usr,
			password: pwd,
		}),
	}).then(console.log("User added"));
};

usr = "grace";
pwd = "mochi";
addUser(usr, pwd);
