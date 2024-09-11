import { useLocalSearchParams } from "expo-router";
import { ScrollView, View, StyleSheet, Text } from "react-native"
import BackButton from "@/components/BackButton";


export default function Home() {
    const { id } = useLocalSearchParams();

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <BackButton />
                <Text>Pet profile</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#e0e0e0',
        overflow: "hidden",
        alignItems: 'center'
    },
});