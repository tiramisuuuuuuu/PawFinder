import { Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { View, StyleSheet , Image} from "react-native"
import { useState, useEffect, useCallback } from "react";
import { SplashContext } from './Context';


SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(true);

    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')});
    
    useEffect(() => {
        if (loaded || error) {
            if (error) { console.log(error) }
            setShowSplash(true);
            }
        else {
            setShowSplash(false);
            }
        }, [loaded, error]);

    const appIsReady_callback = useCallback(async () => {
        if (showSplash == false) {
            SplashScreen.preventAutoHideAsync();
            }
        else {
            await SplashScreen.hideAsync();
            }
        }, []);
    
    appIsReady_callback();
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Image source={require('./pawfinder_header.png')} style={{flex: 1, maxHeight: 100, resizeMode: 'contain'}}></Image>
            </View>
            <SplashContext.Provider value={{showSplash, setShowSplash}}>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="(signin)" />
                    <Stack.Screen name="dashboard" />
                </Stack>
            </SplashContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})