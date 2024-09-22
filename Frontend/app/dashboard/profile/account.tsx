import {
	ScrollView,
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
	getToken,
	getUserInfo,
	retrieveUserBadges,
	setUserField,
} from "./core/services";
import { Avatar, User, Sightings, URL, Badge } from "./core/types";

const icons = {
	backArrow:
		"https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fweui_back-filled.png?alt=media&token=405b2d34-14c9-4272-8949-2c6915efe66a",
	badge: "https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fcarbon_badge.png?alt=media&token=79f9aafd-e9fa-4ac6-87b3-2a668dc9d24c",
	submit: "https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fsubmit.png?alt=media&token=90ba09ba-8ac5-4966-86ee-db1fd9ca6d20",
};

const backButtonPress = () => {
	router.push("./");
};

export default function Account() {
	const [user, setUser] = useState<User>({ passwordLength: 0 });
	const [badges, setBadges] = useState<Badge[]>([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const loadUserInfo = async () => {
		const token = await getToken();
		if (token) {
			setUser(await getUserInfo(token));
		}
	};

	useEffect(() => {
		const getBadges = async () => {
			const token = await getToken();
			if (token) {
				setBadges(await retrieveUserBadges(token));
			}
		};
		loadUserInfo();
		getBadges();
	}, []);

	const onSubmitUsername = async () => {
		const token = await getToken();
		const result = await setUserField(token, "username", username);
		if (result.error) {
			setError(result.error);
		} else {
			setUsername("");
			setError("");
			loadUserInfo();
		}
	};

	const onSubmitPassword = async () => {
		const token = await getToken();
		const result = await setUserField(token, "password", password);
		if (result.error) {
			setError(result.error);
		} else {
			setPassword("");
			setError("");
			loadUserInfo();
		}
	};

	const onSubmitEmail = async () => {
		const token = await getToken();
		const result = await setUserField(token, "email", email);
		if (result.error) {
			setError(result.error);
		} else {
			setEmail("");
			setError("");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.infoContainer}>
				<View style={styles.title}>
					<TouchableOpacity onPress={backButtonPress}>
						<Image
							style={styles.backArrow}
							source={icons.backArrow}
						></Image>
					</TouchableOpacity>
					<Text style={styles.accountInfo}>Account</Text>
				</View>
				<View style={styles.account}>
					<View style={styles.sectionBar}>
						<Image
							style={styles.sectionImage}
							source={icons.badge}
						/>
						<Text style={styles.sectionTitle}>Edit Details</Text>
					</View>
					<View style={styles.details}>
						<View style={styles.detailsTitles}>
							<Text style={styles.detailTitle}>Username:</Text>
							<Text style={styles.detailTitle}>Password:</Text>
							<Text style={styles.detailTitle}>Email</Text>
							<Text style={styles.detailTitle}>
								Date Created:
							</Text>
						</View>
						<View style={styles.detailsValues}>
							<View style={styles.detailValue}>
								<TextInput
									numberOfLines={1}
									style={styles.value}
									placeholder={user.username}
									placeholderTextColor="grey"
									value={username}
									onChangeText={setUsername}
								></TextInput>
								<TouchableOpacity
									style={styles.submitButton}
									onPress={onSubmitUsername}
								>
									<Image
										style={styles.submit}
										source={icons.submit}
									></Image>
								</TouchableOpacity>
							</View>
							<View style={styles.detailValue}>
								<TextInput
									placeholderTextColor="grey"
									numberOfLines={1}
									placeholder={"*".repeat(
										user.passwordLength
									)}
									secureTextEntry={true}
									style={styles.value}
									value={password}
									onChangeText={setPassword}
								></TextInput>
								<TouchableOpacity
									style={styles.submitButton}
									onPress={onSubmitPassword}
								>
									<Image
										style={styles.submit}
										source={icons.submit}
									></Image>
								</TouchableOpacity>
							</View>
							<View style={styles.detailValue}>
								<TextInput
									numberOfLines={1}
									style={styles.value}
									placeholder={user.email}
									placeholderTextColor="grey"
									value={email}
									onChangeText={setEmail}
								></TextInput>
								<TouchableOpacity
									style={styles.submitButton}
									onPress={onSubmitEmail}
								>
									<Image
										style={styles.submit}
										source={icons.submit}
									></Image>
								</TouchableOpacity>
							</View>
							<View style={styles.detailValue}>
								<Text style={styles.value}>
									{user.dateCreated}
								</Text>
							</View>
						</View>
					</View>
					{error.length !== 0 && (
						<Text style={styles.error}>{error}</Text>
					)}
				</View>
				<View style={styles.badges}>
					<View style={styles.sectionBar}>
						<Image
							style={styles.sectionImage}
							source={icons.badge}
						/>
						<Text style={styles.sectionTitle}>Badges</Text>
					</View>
					<View style={styles.badgesContainer}>
						{badges.map((badge) => (
							<View style={styles.badge}>
								<Image
									key={badge._id.toString()}
									source={badge.badgeImageURL}
									style={styles.badgeImage}
								></Image>
								<Text style={styles.badgeName}>
									{badge.badgeName}
								</Text>
							</View>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	// Container
	container: {
		backgroundColor: "#ffd4f8",
		alignItems: "center",
		height: "100%",
	},
	infoContainer: {
		flex: 1,
		height: "100%",
		maxWidth: 600,
		alignItems: "center",
	},
	sectionTitle: {
		flex: 0.9,
		fontFamily: "Poppins-Regular",
		fontWeight: "bold",
		alignSelf: "center",
		fontSize: 20,
	},
	sectionImage: {
		flex: 0.1,
		height: 35,
		width: 35,
		marginRight: 5,
		resizeMode: "contain",
	},
	sectionBar: {
		flexDirection: "row",
		marginBottom: 10,
		width: "100%",
	},
	error: {
		color: "red",
		fontFamily: "Poppins-Regular",
		textAlign: "center",
	},
	// Title container
	title: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
	backArrow: {
		height: 45,
		width: 45,
		resizeMode: "contain",
	},
	accountInfo: {
		flex: 1,
		textAlign: "center",
		fontSize: 21,
		fontWeight: "bold",
		color: "black",
		fontFamily: "Poppins-Regular",
		marginLeft: "8%",
		textDecorationLine: "underline",
	},
	// Account Details
	account: {
		flexDirection: "column",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		backgroundColor: "white",
		marginHorizontal: 10,
		marginVertical: 5,
	},
	details: {
		flexDirection: "row",
		width: "100%",
	},
	detailsTitles: {
		flex: 0.65,
		flexDirection: "column",
	},
	detailTitle: {
		fontFamily: "Poppins-Regular",
		fontSize: 15,
		marginVertical: 5,
	},
	detailsValues: {
		flex: 1,
		flexDirection: "column",
	},
	value: {
		flex: 1,
		fontFamily: "Poppins-Regular",
		fontSize: 15,
	},
	detailValue: {
		flex: 1,
		flexDirection: "row",
		gap: 15,
		marginVertical: 5,
	},
	submitButton: {
		flex: 0.1,
		resizeMode: "center",
		alignSelf: "center",
	},
	submit: {
		height: 20,
		width: 25,
	},
	// Badges
	badges: {
		flexDirection: "column",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		backgroundColor: "white",
		marginHorizontal: 10,
		marginVertical: 5,
	},
	badgeTitle: {
		fontFamily: "Poppins-Regular",
		fontSize: 20,
	},
	badgesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 20,
		justifyContent: "center",
	},
	badge: {
		flexDirection: "column",
	},
	badgeImage: {
		height: 60,
		width: 60,
		resizeMode: "center",
		alignSelf: "center",
	},
	badgeName: { minWidth: 50, fontFamily: "Poppins-Regular" },
});
