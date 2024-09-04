import { View, ImageBackground } from "react-native"
import { StyleSheet } from "react-native"

export default function SignIn() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground source={require('./signin_bg.png')} resizeMode="repeat" tintColor="#448da5" style={styles.image_bg}></ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    image_bg: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#a6d2e0',
        overflow: "hidden"
    },
});

