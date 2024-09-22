import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, User, Sightings, URL, Badge } from "./types";
import Constants from "expo-constants";

export async function getToken(): Promise<string> {
	try {
		const value = await AsyncStorage.getItem("token");
		if (value === null) {
			return "";
		}
		return value;
	} catch (error) {
		console.error("Error getting token:", error);
		return "";
	}
}

export async function getAvatars(): Promise<Avatar[]> {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/getAvatars/`,
			{
				method: "get",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);
		const result: Avatar[] = await response.json();
		return result;
	} catch (err) {
		console.error("Network issue:", err);
		return [];
	}
}

export async function getAvatarURL(token: string): Promise<string> {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/getUserAvatar/`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userToken: token,
				}),
			}
		);
		const result: URL = await response.json();
		return result.url || "";
	} catch (err) {
		console.error("Network issue:", err);
		return "";
	}
}

export async function getUserInfo(token: string): Promise<any> {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/getUser/`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userToken: token,
				}),
			}
		);
		const result: User = await response.json();
		return result;
	} catch (err) {
		console.error("Network issue:", err);
		const result: User = {};
		return result;
	}
}

export async function changeUserAvatar(userToken: string, avatarToken: string) {
	try {
		await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/setUserAvatar/`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userToken,
					avatarToken,
				}),
			}
		);
	} catch (err) {
		console.error("Network issue:", err);
	}
}

export async function userSightingsNum(userToken: string): Promise<number> {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/getSightings/`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userToken,
				}),
			}
		);
		const result: Sightings[] = await response.json();
		return result.length;
	} catch (err) {
		console.error("Network issue:", err);
		return 0;
	}
}

export async function retrieveBadgeLength(token: string): Promise<number> {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/getUserBadges/`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userToken: token,
				}),
			}
		);
		const result: Badge[] = await response.json();
		return result.length;
	} catch (err) {
		console.error("Network issue:", err);
		return 0;
	}
}

export async function retrieveUserBadges(token: string): Promise<Badge[]> {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/getUserBadges/`,
			{
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userToken: token,
				}),
			}
		);
		const result: Badge[] = await response.json();
		return result;
	} catch (err) {
		console.error("Network issue:", err);
		return [];
	}
}
