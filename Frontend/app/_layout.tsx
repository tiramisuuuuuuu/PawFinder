import { Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { View, StyleSheet, Image, ActivityIndicator} from "react-native"
import { useState, useEffect, useCallback } from "react";
import { SplashContext } from './Context';
import LoadingScreen from "@/components/LoadingScreen";


SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(false);

    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')});
    
    useEffect(() => {
        if (loaded || error) {
            if (error) { console.log(error) }
            setShowSplash(false);
            console.log("closing splash")
            }
        else {
            setShowSplash(true);
            console.log("splash on")
            }
        }, [loaded, error]);

    useEffect(() => {
        async function updateSplash() {
            if (showSplash == true) {
                SplashScreen.preventAutoHideAsync();
                }
            else {
                await SplashScreen.hideAsync();
                }
        }
        
        updateSplash();
        }, [showSplash]);

    if (showSplash == true) { return <LoadingScreen /> }
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.header}>
                <Image source={require('./pawfinder_header.png')} style={{flex: 1, maxHeight: 100, resizeMode: 'contain'}}></Image>
            </View>
            <SplashContext.Provider value={{showSplash, setShowSplash}}>
                <View style={styles.container}>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="(signin)" />
                        <Stack.Screen name="dashboard" />
                    </Stack>
                </View>
            </SplashContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden"
    }
})