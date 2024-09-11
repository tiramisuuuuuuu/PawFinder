
import { ScrollView, View, StyleSheet, Pressable, Text } from "react-native"
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
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <Pressable style={{backgroundColor: 'orange', borderWidth: 2, borderColor: 'blue', padding: 10, margin: 100}}>
                <Text> pet profile link</Text>
                </Pressable>
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
        alignItems: 'center',
    },
});