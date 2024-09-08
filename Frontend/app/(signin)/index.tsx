import { useFonts } from 'expo-font';
import { View, TextInput, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { StyleSheet } from "react-native"
import { useContext, useEffect, useRef, useState } from "react";
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PageLoadContext } from "../Context";
import { addUser } from "../../scripts/add_user";


function InputField({children, header, iconName, redBox, displayErrorMsg, ...props}) {
    return (
        <View style={styles.input_field}>
            <Text style={styles.input_heading}>
                <Text>{header}</Text>
                {displayErrorMsg && <Text style={{color: 'red'}}>{props.errorMsg}</Text>}</Text>
            <View style={[styles.div_input, {borderColor: (redBox || displayErrorMsg) ? 'red' : '#448da5'}]}>
                <Octicons name={iconName} style={styles.icon} />
                {children}</View></View>
    )
}


export default function SignIn() {
    const {pageIsReady, setPageIsReady} = useContext(PageLoadContext);
    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf')});
    const [loading, setLoading] = useState(false);
    const username = useRef("");
    const email = useRef("");
    const password = useRef("");
    const confirm_password = useRef("");
    const [errorObj, setErrorObj] = useState({});
    let emptyParams = [];
    if (errorObj.hasOwnProperty('emptyParams')) { emptyParams = errorObj.emptyParams }
    

    useEffect(() => {
        if (loaded || error) {
            if (error) { console.log(error) }
            setPageIsReady(true);
            }
        else {
            setPageIsReady(false);
            }
        }, [loaded, error]);
    
    useEffect(() => {
        async function sign_up() {
            const response = await addUser(username.current, password.current);
            if (response == "Username already taken. Choose another username.") {
                setErrorObj({ usernameTaken: true });
                }
            setLoading(false);
        }

        if (loading) { sign_up() }
        }, []);


    function clickSignin_handler() {
        let err_obj = {};
        let emptyParams = []
        if (username.current=="") { emptyParams.push("username") }
        if (email.current=="") { emptyParams.push("email") }
        if (password.current=="") { emptyParams.push("password") }
        if (confirm_password.current=="") { emptyParams.push("confirm_password") }
        if (emptyParams.length != 0) {
            err_obj.emptyParams = emptyParams;;
            }
        if (confirm_password.current!=password.current) {
            err_obj.unmatchedPasswords = true;
            }
        
        if (Object.keys(err_obj).length > 0) {
            setErrorObj(err_obj);
            return;
            } 
        setErrorObj({});
        setLoading(true);
    }


    if (loading) { return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> }
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.container}>
                {emptyParams.length>0 && <Text style={styles.error}>Missing one or more paramters.</Text>}
                {errorObj.hasOwnProperty('usernameTaken') && <Text style={styles.error}>Username already taken. Choose another username.</Text>}
                <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 24, marginBottom: 15, marginTop: 25}}>Let's get started!</Text>
                
                <InputField header="Username" iconName="person" redBox={emptyParams.includes("username")} displayErrorMsg={false}>
                    <TextInput placeholder="Username" onChangeText={(newText)=>{username.current=newText}} style={styles.input} />
                    </InputField>
                
                <InputField header="Email" iconName="mail" redBox={emptyParams.includes("email")} displayErrorMsg={false}>
                    <TextInput placeholder="your_email_id@mail.com" onChangeText={(newText)=>{email.current=newText}} style={styles.input} />
                    </InputField>

                <InputField header="Password" iconName="lock" redBox={emptyParams.includes("password")} displayErrorMsg={false}>
                    <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(newText)=>{password.current=newText}} style={styles.input} />
                    </InputField>

                <InputField header="Password" iconName="lock" redBox={emptyParams.includes("confirm_password")} displayErrorMsg={errorObj.hasOwnProperty('unmatchedPasswords')} errorMsg="*Passwords do not match*">
                    <TextInput placeholder="Confirm Password" secureTextEntry={true} onChangeText={(newText)=>{confirm_password.current=newText}} style={styles.input} />
                    </InputField>
                
                <TouchableOpacity onPressIn={()=>{clickSignin_handler()}} style={styles.bttn}>
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '-15deg'}, {translateY: -5}]}} />
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '15deg'}, {translateY: 5}]}} />
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 17, marginLeft: 3}}>SIGN UP</Text>
                    </TouchableOpacity>
                <View style={{marginTop: 15}}>
                    <Text style={styles.input_heading}>Or continue with:</Text>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("./google_icon.png")} resizeMode="contain" style={styles.alt_icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#e0e0e0',
        overflow: "hidden",
        alignItems: 'center',
    },
    error: {
        width: "100%",
        color: 'red',
        backgroundColor: 'pink',
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    input_field: {
        marginBottom: 15,
    },
    input_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    div_input: {
        width: 310,
        height: 35,
        backgroundColor: 'white',
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
        fontFamily: 'Poppins-Regular',
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
    },
    alt_icon: {
        width: 55,
        height: 50,
        marginTop: 15,
        backgroundColor: "white",
        borderRadius: 15
    }
});
