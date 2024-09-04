import { View, StyleSheet } from "react-native"

export default function Home() {
    return (
        <View style={styles.tab_bar}>
            yeehaw
        </View>
    )
}

const styles = StyleSheet.create({
    tab_bar: {
        flex: 1,
        backgroundColor: 'purple',
    }
});