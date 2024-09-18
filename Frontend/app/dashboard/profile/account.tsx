import {
	ScrollView,
	View,
	StyleSheet,
	Text,
	Image,
	Button,
} from "react-native";

import { router } from "expo-router";

export default function Account() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text>Account Info</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	// Common
	container: {
		flex: 1,
		backgroundColor: "#ffd4f8",
	},
});
