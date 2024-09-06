import { Stack } from "expo-router"
import { View, StyleSheet , Image} from "react-native"
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback, useContext } from "react";
import { PageLoadContext } from './Context';

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        async function test() {
            await new Promise(resolve => setTimeout(resolve, 5000));
            setLoaded(true);
        }
        test();

        }, []);

    const loaded_callback = useCallback(async () => {
        if (loaded == false) {
            SplashScreen.preventAutoHideAsync();
            }
        else {
            await SplashScreen.hideAsync();
            }
        }, [loaded])

    if (loaded == false) {
        return null
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Image source={require('./pawfinder_header.png')} style={{flex: 1, resizeMode: 'contain'}}></Image>
            </View>
            <PageLoadContext.Provider value={{loaded, setLoaded}}>
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
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})