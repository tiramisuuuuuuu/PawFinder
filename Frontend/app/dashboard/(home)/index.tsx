
import { ScrollView, View, StyleSheet } from "react-native"
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const [pageIsReady, setPageIsReady] = useState(false);
    const [location, setLocation] = useState(95616);

    useEffect(()=>{
        if (!pageIsReady) {
            setPageIsReady(true);
        }
    }, [])


    return (
        <ScrollView contentContainerStyle={styles.tab_bar}>
            yeehaw
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tab_bar: {
        flex: 1,
        backgroundColor: 'purple',
    }
});