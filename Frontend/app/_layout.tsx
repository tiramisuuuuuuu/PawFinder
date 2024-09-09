import { Stack } from "expo-router"
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { View, StyleSheet , Image} from "react-native"
import { useState, useEffect, useCallback } from "react";
import { PageLoadContext } from './Context';


SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [pageIsReady, setPageIsReady] = useState(true);

    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../assets/fonts/LilitaOne-Regular.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf')});
    
    useEffect(() => {
        if (loaded || error) {
            if (error) { console.log(error) }
            setPageIsReady(true);
            }
        else {
            setPageIsReady(false);
            }
        }, [loaded, error]);

    const pageIsReady_callback = useCallback(async () => {
        if (pageIsReady == false) {
            SplashScreen.preventAutoHideAsync();
            }
        else {
            await SplashScreen.hideAsync();
            }
        }, []);
    
    pageIsReady_callback();
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Image source={require('./pawfinder_header.png')} style={{flex: 1, maxHeight: 100, resizeMode: 'contain'}}></Image>
            </View>
            <PageLoadContext.Provider value={{pageIsReady, setPageIsReady}}>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="(signin)" />
                    <Stack.Screen name="dashboard" />
                </Stack>
            </PageLoadContext.Provider>
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