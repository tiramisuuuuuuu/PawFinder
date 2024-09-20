import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

type Avatar = {
	_id: string;
	avatarImageURL: string;
};

type User = {
	_id?: string;
	username?: string;
	email?: string;
	password?: string;
	badges?: string[];
	avatar?: string;
};

type URL = {
	url?: string;
};

async function getToken(): Promise<string> {
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

async function getAvatars(): Promise<Avatar[]> {
	try {
		const response = await fetch(`http://${Constants.expoConfig?.extra?.backendURL}/getAvatars/`, {
			// Change localhost to your IP
			method: "get",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const result: Avatar[] = await response.json();
		return result;
	} catch (err) {
		console.error("Network issue:", err);
		return [];
	}
}

async function getAvatarURL(token: string): Promise<string> {
	try {
		const response = await fetch(
			`http://${Constants.expoConfig?.extra?.backendURL}/getUserAvatar/`,
			{
				// Change localhost to your IP
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
		if (!result.url) {
			return "";
		}
		return result.url;
	} catch (err) {
		console.error("Network issue:", err);
		return "";
	}
}

async function getUserInfo(token: string): Promise<any> {
	try {
		const response = await fetch(`http://${Constants.expoConfig?.extra?.backendURL}/getUser/`, {
			// Change localhost to your IP
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userToken: token,
			}),
		});
		const result: User = await response.json();
		return result;
	} catch (err) {
		console.error("Network issue:", err);
		return [];
	}
}

const handleAvatarPress = () => {
	console.log("Yess");
};

const handleButtonPress = () => {
	router.push("./profile/account");
};

export default function Profiles() {
	// const avatarSource = require("./avatars/dog.png");
	const accountSource = require("./account.png");
	const arrowSource = require("./right-arrow.png");
	const avatarIconSource = require("./avatar.png");
	const medalSource = require("./medal.png");

	const [avatars, setAvatars] = useState<Avatar[]>([]);
	const [user, setUser] = useState<User>({});
	const [avatarUrl, setAvatarUrl] = useState<string>("");

	useEffect(() => {
		const fetchAvatars = async () => {
			const avatarObjs = await getAvatars();
			setAvatars(avatarObjs);
		};
		const loadUserInfo = async () => {
			const token = await getToken();
			if (token) {
				setUser(await getUserInfo(token));
				const url = await getAvatarURL(token);
				console.log(url);
				setAvatarUrl(url);
			}
		};
		fetchAvatars();
		loadUserInfo();
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.title}>
				<Text style={styles.profile}>Profile</Text>
				<Text style={styles.username}>{user.username}</Text>
				<Image style={styles.avatarImages} source={avatarUrl} />
			</View>
			<View style={styles.account}>
				<TouchableOpacity
					style={styles.button}
					onPress={handleButtonPress}
					activeOpacity={1}
				>
					<Image style={styles.sectionImage} source={accountSource} />
					<Text style={styles.sectionTitle}>Account Info</Text>
					<Image source={arrowSource} style={styles.arrow} />
				</TouchableOpacity>
			</View>
			<View style={styles.avatar}>
				<View style={styles.avatarTitle}>
					<Image
						style={styles.sectionImage}
						source={avatarIconSource}
					/>
					<Text style={styles.sectionTitle}>Avatar</Text>
				</View>
				<View style={styles.avatarChoices}>
					{avatars.map((avatar) => (
						<TouchableOpacity
							key={avatar._id.toString()}
							onPress={handleAvatarPress}
							activeOpacity={1}
						>
							<Image
								key={avatar._id.toString()}
								source={{ uri: avatar.avatarImageURL }}
								style={styles.avatarSelectionImg}
							/>
						</TouchableOpacity>
					))}
				</View>
			</View>
			<View style={styles.achievements}>
				<View style={styles.avatarTitle}>
					<Image style={styles.sectionImage} source={medalSource} />
					<Text style={styles.sectionTitle}>Points And Badges</Text>
				</View>
			</View>
		</ScrollView>
	);
}
