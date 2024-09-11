
import { ScrollView, View, StyleSheet } from "react-native"


export default function Home() {

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                yeehaw
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
    },
});