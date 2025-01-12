import { router } from "expo-router";
import Constants from 'expo-constants';



// Delete after development
export function bypassAuthentication() {
	router.replace("/dashboard");
}

export const login = async (usr, pwd) => {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/authenticateUser/`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: usr,
					password: pwd,
				}),
			}
		);
		return response.json();
	} catch (err) {
		return { error: "Network issue." };
	}
};


/*
	@params
		@usr: string,
		@email: string,
		@pwd: string,
		@confirm_pwd: string
*/
export const createNewUser = async (
	usr,
	email,
	pwd,
	confirm_pwd
) => {
	try {
		const response = await fetch(`http://${Constants.expoConfig?.extra?.backendURL}/addUser/`, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: usr,
				email: email,
				password: pwd,
				confirmPassword: confirm_pwd,
			}),
		});
		return response.json();
	} catch (err) {
		return { error: "Network issue." };
	}
};