
import {
	ScrollView,
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

export default function Profiles() {
	const avatarSource = require("./avatars/dog.png");
	const accountSource = require("./account.png");
	const arrowSource = require("./right-arrow.png");
	const avatarIconSource = require("./avatar.png");
	const medalSource = require("./medal.png");
	const avatars = [
		require("./avatars/bunny.png"),
		require("./avatars/cat.png"),
		require("./avatars/dog.png"),
		require("./avatars/octopus.png"),
		require("./avatars/panda.png"),
		require("./avatars/tiger.png"),
		require("./avatars/turtle.png"),
		require("./avatars/whale.png"),
	];
	const handleButtonPress = () => {
		console.log("Success");
		router.push("./profile/account");
	};
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.title}>
				<Text style={styles.profile}>Profile</Text>
				<Text style={styles.username}>username</Text>
				<Image
					style={styles.avatarImages}
					source={avatarSource}
				></Image>
			</View>
			<View style={styles.account}>
				<TouchableOpacity
					style={styles.button}
					onPress={handleButtonPress}
				>
					<Image
						style={styles.sectionImage}
						source={accountSource}
					></Image>
					<Text style={styles.sectionTitle}>Account Info</Text>
					<Image source={arrowSource} style={styles.arrow}></Image>
				</TouchableOpacity>
			</View>
			<View style={styles.avatar}>
				<View style={styles.avatarTitle}>
					<Image
						style={styles.sectionImage}
						source={avatarIconSource}
					></Image>
					<Text style={styles.sectionTitle}>Avatar</Text>
				</View>
				<View style={styles.avatarChoices}>
					{avatars.map((avatar) => (
						<Image
							source={avatar}
							style={styles.avatarSelectionImg}
						></Image>
					))}
				</View>
			</View>
			<View style={styles.achievements}>
				<View style={styles.avatarTitle}>
					<Image
						style={styles.sectionImage}
						source={medalSource}
					></Image>
					<Text style={styles.sectionTitle}>Points And Badges</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	// Common
	container: {
		flex: 1,
		backgroundColor: "#ffd4f8",
		minHeight: "100%",
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
		flex: 0.3,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
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
		flex: 0.2,
		flexDirection: "row",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		margin: 10,
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
		flex: 1,
		flexDirection: "column",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		marginHorizontal: 10,
		marginVertical: 10,
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
	// Achievements
	achievements: {
		flex: 1,
		flexDirection: "column",
		padding: 10,
		borderColor: "#fa7ae0",
		borderWidth: 3,
		borderRadius: 20,
		marginHorizontal: 10,
		marginVertical: 10,
	},
});
