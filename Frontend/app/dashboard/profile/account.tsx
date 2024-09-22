import {
	ScrollView,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
	getToken,
	getAvatars,
	getAvatarURL,
	getUserInfo,
	changeUserAvatar,
	userSightingsNum,
	retrieveUserBadges,
} from "./core/services";
import { Avatar, User, Sightings, URL, Badge } from "./core/types";

const icons = {
	backArrow:
		"https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fweui_back-filled.png?alt=media&token=405b2d34-14c9-4272-8949-2c6915efe66a",
	edit: "https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2FbadgeImage.png?alt=media&token=9e4509ab-8913-45d4-a349-bbd8b5c2e945",
	badge: "https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fcarbon_badge.png?alt=media&token=79f9aafd-e9fa-4ac6-87b3-2a668dc9d24c",
};

const backButtonPress = () => {
	router.push("./");
};

export default function Account() {
	const [user, setUser] = useState<User>({});
	const [badges, setBadges] = useState<Badge[]>([]);

	useEffect(() => {
		const loadUserInfo = async () => {
			const token = await getToken();
			if (token) {
				setUser(await getUserInfo(token));
			}
		};
		const getBadges = async () => {
			const token = await getToken();
			if (token) {
				setBadges(await retrieveUserBadges(token));
			}
		};
		loadUserInfo();
		getBadges();
	}, []);
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
						<Text style={styles.sectionTitle}>Details</Text>
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
								<Text style={styles.detailTitle}>
									{user.username}
								</Text>
								<Image
									style={styles.edit}
									source={icons.edit}
								></Image>
							</View>
							<View style={styles.detailValue}>
								<Text style={styles.detailTitle}>
									{user.username}
								</Text>
								<Image
									style={styles.edit}
									source={icons.edit}
								></Image>
							</View>
							<View style={styles.detailValue}>
								<Text style={styles.detailTitle}>
									{user.email}
								</Text>
								<Image
									style={styles.edit}
									source={icons.edit}
								></Image>
							</View>
							<View style={styles.detailValue}>
								<Text style={styles.detailTitle}>
									{user.username}
								</Text>
							</View>
						</View>
					</View>
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
		height: 35,
		width: 35,
		marginRight: 5,
		resizeMode: "contain",
	},
	sectionBar: {
		flexDirection: "row",
		marginBottom: 10,
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
		flex: 1,
		flexDirection: "column",
	},
	detailTitle: {
		fontFamily: "Poppins-Regular",
		fontSize: 17,
	},
	detailsValues: {
		flex: 0.7,
		flexDirection: "column",
	},
	detailValue: {
		flexDirection: "row",
		gap: 40,
	},
	edit: {
		height: 22,
		width: 20,
		resizeMode: "center",
		alignSelf: "center",
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
