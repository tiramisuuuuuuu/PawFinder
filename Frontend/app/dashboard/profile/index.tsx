import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
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
	retrieveBadgeLength,
} from "./core/services";
import { Avatar, User, Sightings, URL, Badge } from "./core/types";

const handleButtonPress = () => {
	router.push("./profile/account");
};

const icons = {
	rightArrow:
		"https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fright-arrow.png?alt=media&token=2a717032-f42b-4df4-9f2a-a84512f419f1",
	account:
		"https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Faccount.png?alt=media&token=925e6fc5-6eec-4217-98e3-f95a8ec7dde1",
	medal: "https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fmedal.png?alt=media&token=3d68554a-e5b0-4b18-a5c1-d7fea1f1004e",
	avatar: "https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Favatar.png?alt=media&token=f2498051-6fa6-4f7b-9540-822cff445c36",
	sightings:
		"https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fion_paw-outline.png?alt=media&token=562772fe-0f41-43cf-8d55-f3731b5bdc6f",
	badges: "https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fsimple-line-icons_badge.png?alt=media&token=ebb400c6-028f-4950-a562-7374fa9a6517",
	petsFound:
		"https://firebasestorage.googleapis.com/v0/b/pawfinder-1f103.appspot.com/o/static%2Fmaterial-symbols_pet-supplies-outline.png?alt=media&token=83ca63a4-c18a-473f-bd05-f36b611018a8",
};

export default function Profiles() {
	const [avatars, setAvatars] = useState<Avatar[]>([]);
	const [user, setUser] = useState<User>({});
	const [avatarUrl, setAvatarUrl] = useState<string>("");
	const [sightingsNum, setSightingsNum] = useState<number>(0);
	const [badges, setBadges] = useState<number>(0);

	const handleAvatarPress = async (avatarToken: string) => {
		const token = await getToken();
		await changeUserAvatar(token, avatarToken);
		const newUrl = await getAvatarURL(token);
		setAvatarUrl(newUrl);
	};

	useEffect(() => {
		const fetchAvatars = async () => {
			setAvatars(await getAvatars());
		};
		const fetchBadges = async () => {
			const token = await getToken();
			if (token) {
				setBadges(await retrieveBadgeLength(token));
			}
		};
		const loadUserInfo = async () => {
			const token = await getToken();
			if (token) {
				setUser(await getUserInfo(token));
				setAvatarUrl(await getAvatarURL(token));
			}
		};
		const getSightingsNum = async () => {
			const token = await getToken();
			if (token) {
				setSightingsNum(await userSightingsNum(token));
			}
		};

		fetchAvatars();
		fetchBadges();
		loadUserInfo();
		getSightingsNum();
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View>
				<View style={styles.infoContainer}>
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
							<Image
								style={styles.sectionImage}
								source={icons.account}
							/>
							<Text style={styles.sectionTitle}>
								Account Info
							</Text>
							<Image
								source={icons.rightArrow}
								style={styles.arrow}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.avatar}>
						<View style={styles.avatarTitle}>
							<Image
								style={styles.sectionImage}
								source={icons.avatar}
							/>
							<Text style={styles.sectionTitle}>Avatar</Text>
						</View>
						<View style={styles.avatarChoices}>
							{avatars.map((avatar) => (
								<TouchableOpacity
									key={avatar._id.toString()}
									onPress={() => {
										handleAvatarPress(
											avatar._id.toString()
										);
									}}
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
							<Image
								style={styles.sectionImage}
								source={icons.medal}
							/>
							<Text style={styles.sectionTitle}>
								Achievements
							</Text>
						</View>
						<View style={styles.achievementsContainer}>
							<Image
								style={styles.achievementIcon}
								source={icons.sightings}
							></Image>
							<Text style={styles.achievementCount}>
								Animals Sighted: {sightingsNum}
							</Text>
						</View>
						<View style={styles.achievementsContainer}>
							<Image
								style={styles.achievementIcon}
								source={icons.badges}
							></Image>
							<Text style={styles.achievementCount}>
								Pets Found: 5
							</Text>
						</View>
						<View style={styles.achievementsContainer}>
							<Image
								style={styles.achievementIcon}
								source={icons.badges}
							></Image>
							<Text style={styles.achievementCount}>
								Badges: {badges}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffd4f8",
		alignItems: "center",
		height: "100%",
	},
	infoContainer: {
		flex: 1,
		height: "100%",
		maxWidth: 600,
	},
	avatarImages: {
		height: 50,
		width: 50,
		resizeMode: "contain",
		alignSelf: "center",
		borderRadius: 50 / 2,
		borderWidth: 3,
		borderColor: "#fa7ae0",
		padding: 5,
		marginRight: 20,
		backgroundColor: "black",
	},
	sectionTitle: {
		flex: 0.9,
		fontFamily: "Poppins-Regular",
		fontWeight: "bold",
		alignSelf: "center",
	},
	sectionImage: {
		height: 45,
		width: 45,
		marginRight: 5,
		resizeMode: "contain",
	},
	// Title
	title: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 5,
	},
	profile: {
		flex: 1,
		color: "black",
		fontFamily: "Poppins-Regular",
		fontSize: 21,
		textAlign: "left",
		marginLeft: "8%",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
	username: {
		flex: 1,
		color: "black",
		fontSize: 15,
		textAlign: "right",
		paddingRight: 10,
		fontFamily: "Poppins-Regular",
	},
	// Account
	account: {
		flexDirection: "row",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		marginHorizontal: 10,
		marginVertical: 5,
		backgroundColor: "white",
	},
	button: {
		flex: 1,
		flexDirection: "row",
	},
	arrow: {
		flex: 0.1,
		height: 35,
		width: 35,
		alignSelf: "center",
		resizeMode: "contain",
	},
	// Avatar
	avatar: {
		flexDirection: "column",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		marginHorizontal: 10,
		marginVertical: 5,
		backgroundColor: "white",
	},
	avatarTitle: {
		flexDirection: "row",
	},
	avatarChoices: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		columnGap: 15,
		rowGap: 5,
	},
	avatarSelectionImg: {
		height: 60,
		width: 60,
		resizeMode: "contain",
		alignSelf: "center",
		borderRadius: 60 / 2,
		borderWidth: 3,
		borderColor: "#fa7ae0",
		padding: 5,
		backgroundColor: "black",
	},
	avatarSelected: {
		height: 60,
		width: 60,
		resizeMode: "contain",
		alignSelf: "center",
		borderRadius: 60 / 2,
		borderWidth: 5,
		borderColor: "#7563eb",
		padding: 5,
		backgroundColor: "black",
	},
	// Achievements
	achievements: {
		flex: 1,
		flexDirection: "column",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		marginHorizontal: 10,
		marginVertical: 5,
		backgroundColor: "white",
	},
	achievementsContainer: {
		flexDirection: "row",
		paddingLeft: "20%",
		margin: 10,
		gap: 10,
	},
	achievementIcon: { height: 20, width: 20 },
	achievementCount: {
		fontFamily: "Poppins-Regular",
		alignSelf: "center",
		fontSize: 13,
	},
});
