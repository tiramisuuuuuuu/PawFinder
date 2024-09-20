import {
	ScrollView,
	View,
	StyleSheet,
	Text,
	Image,
	Button,
} from "react-native";

export default function Account() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text>Account Info</Text>
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
