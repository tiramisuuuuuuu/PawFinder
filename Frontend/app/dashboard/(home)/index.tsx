
import { View, StyleSheet } from "react-native"
import { useState } from "react";
import * as Location from 'expo-location';

export default function Home() {
    const [location, setLocation] = useState(95616)


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