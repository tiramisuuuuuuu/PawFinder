import { View, ImageBackground, TextInput, Text } from "react-native"
import { StyleSheet } from "react-native"
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function SignIn() {

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground source={require('./signin_bg.png')} resizeMode="repeat" tintColor="#448da5" style={styles.image_bg}>
                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Username</Text>
                    <View style={styles.div_input}>
                        <Octicons name="person" style={styles.icon} />
                        <TextInput placeholder="Username" style={styles.input} /></View></View>
                
                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Email</Text>
                    <View style={styles.div_input}>
                        <Octicons name="mail" style={styles.icon} />
                        <TextInput placeholder="your_email_id@mail.com" style={styles.input} /></View></View>

                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Password</Text>
                    <View style={styles.div_input}>
                        <Octicons name="lock" style={styles.icon} />
                        <TextInput placeholder="Password" style={styles.input} /></View></View>

                <View style={styles.input_field}>
                    <Text style={styles.input_heading}>Confirm Password</Text>
                    <View style={styles.div_input}>
                        <Octicons name="lock" style={styles.icon} />
                        <TextInput placeholder="Confirm Password" style={styles.input} /></View></View>
                
                <MaterialCommunityIcons name="paw-outline" size={24} color="black" />
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
        marginBottom: 15,
    },
    input_heading: {
        fontSize: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    div_input: {
        width: 310,
        height: 35,
        backgroundColor: 'white',
        borderColor: '#448da5',
        borderWidth: 1,
        borderRadius: 7,
        overflow: 'hidden',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 17,
        color: 'black',
        paddingRight: 10,
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        fontSize: 13,
        color: 'grey',
    }
});

