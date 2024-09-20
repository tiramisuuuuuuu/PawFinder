
import { ScrollView, View, Text, StyleSheet } from "react-native"


export default function MapPage() {

    return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text>yeehaw</Text>
				<Text>atttttttttt</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
    },
});