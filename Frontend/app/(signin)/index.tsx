import { View, ImageBackground, TextInput, Text, Pressable } from "react-native"
import { StyleSheet } from "react-native"
import Octicons from '@expo/vector-icons/Octicons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext, useEffect } from "react";
import { PageLoadContext } from "../Context";
import { useFonts } from 'expo-font';


export default function SignIn() {
    const {pageIsReady, setPageIsReady} = useContext(PageLoadContext);
    const [loaded, error] = useFonts({
        'LilitaOne-Regular': "../../assets/fonts/LilitaOne-Regular.ttf"});

    useEffect(() => {
        if (loaded || error) {
            setPageIsReady(true);
            }
        else {
            setPageIsReady(false);
            }
        }, [loaded, error]);

    function clickSignin_handler() {
        
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ImageBackground source={require('./signin_bg.png')} resizeMode="repeat"  tintColor="purple" style={styles.image_bg} imageStyle={{opacity: 0.1}}>
                <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 24, margin: 15}}>Let's get started!</Text>
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
                
                <Pressable onPress={()=>{clickSignin_handler()}} style={styles.bttn}>
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '-15deg'}, {translateY: -5}]}} />
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '15deg'}, {translateY: 5}]}} />
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 17, marginLeft: 3}}>SIGN UP</Text>
                </Pressable>
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
        borderWidth: 2,
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
    },
    bttn: {
        width: 130,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 5,
        marginTop: 30,
    }
});
