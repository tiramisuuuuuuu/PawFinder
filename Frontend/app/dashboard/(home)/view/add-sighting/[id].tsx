
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
        backgroundColor: '#e0e0e0',
    },
});