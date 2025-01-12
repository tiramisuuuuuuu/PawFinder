import { Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { View, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import 'react-native-get-random-values';


SplashScreen.preventAutoHideAsync()

/* 
    RootLayout sets the Pawfinder logo as a header for all the children pages/layouts,
    it loads the fonts to be used in the rest of the project
*/

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(false);

    // non-blocking/async function useFonts will update state variables loaded or error when function is resolved and trigger rerender
    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')});
    
    useEffect(() => {
        if (loaded || error) {
            if (error) { console.log(error) }
            setShowSplash(false);
            console.log("closing splash");
            }
        }, [loaded, error]);

    useEffect(() => {
        async function tryCloseSplash() {
            if (!showSplash) {
                await SplashScreen.hideAsync(); // hide SplashScreen must be settled in async-await to make sure its execution completes and closes
            }
        }
        tryCloseSplash();
    }, [showSplash]);


    if (showSplash == true) { return <View /> }
    // force components to rerender with new Fonts when splashScreen is closed (showSplash==false)
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header />
            <View style={styles.contentContainer}>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="(signin)" />
                    <Stack.Screen name="dashboard" />
                </Stack>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden"
    }
});