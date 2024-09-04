import { Stack } from "expo-router"
import { View, StyleSheet , Image} from "react-native"

export default function RootLayout() {
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Image source={require('./pawfinder_header.png')} style={{flex: 1, resizeMode: 'contain'}}></Image>
            </View>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(signin)" />
                <Stack.Screen name="dashboard" />
            </Stack>
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