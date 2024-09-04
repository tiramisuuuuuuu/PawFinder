import { View, ImageBackground, TextInput, Text } from "react-native"
import { StyleSheet } from "react-native"

export default function SignIn() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground source={require('./signin_bg.png')} resizeMode="repeat" tintColor="#448da5" style={styles.image_bg}>
                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Username</Text>
                    <View style={styles.div_input}>
                    <TextInput placeholder="Username" style={styles.input} /></View></View>
                
                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Email</Text>
                    <View style={styles.div_input}>
                    <TextInput placeholder="Email" style={styles.input} /></View></View>

                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Password</Text>
                    <View style={styles.div_input}>
                    <TextInput placeholder="Password" style={styles.input} /></View></View>

                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Confirm Password</Text>
                    <View style={styles.div_input}>
                    <TextInput placeholder="Confirm Password" style={styles.input} /></View></View>
            </ImageBackground>
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
        overflow: "hidden",
        alignItems: 'center',
    },
    input_field: {
        marginBottom: 50,
    },
    input_heading: {
        fontSize: 15,
    },
    div_input: {
        width: 300,
        height: 30,
        backgroundColor: 'purple',
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
    }
});

