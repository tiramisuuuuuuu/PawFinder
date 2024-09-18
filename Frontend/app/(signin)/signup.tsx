import { View, ScrollView, TextInput, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from "./styles";
import InputField from "../../components/InputField";
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const username = useRef("");
    const email = useRef("");
    const password = useRef("");
    const confirm_password = useRef("");
    const [errorObj, setErrorObj] = useState({});
    let emptyParams = [];
    if (errorObj.hasOwnProperty('emptyParams')) { emptyParams = errorObj.emptyParams }
    
    
    useEffect(() => {
        async function sign_up() {
            //-----------------add sign up function here, plus error handling (setErrorObj)
            await AsyncStorage.setItem('token', '12345');
            router.replace("/dashboard");
            setLoading(false);
        }

        if (loading) { sign_up() }
        }, [loading]);


    function clickSignup_handler() {
        let err_obj = {};
        let emptyParams = []
        if (username.current=="") { emptyParams.push("username") }
        if (email.current=="") { emptyParams.push("email") }
        if (password.current=="") { emptyParams.push("password") }
        if (confirm_password.current=="") { emptyParams.push("confirm_password") }
        if (emptyParams.length != 0) {
            err_obj.emptyParams = emptyParams;
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
        <View style={{flex: 1, backgroundColor: '#e0e0e0'}}>
            <ScrollView contentContainerStyle={styles.container}>
                {emptyParams.length>0 && <Text style={styles.error}>Missing one or more parameters.</Text>}
                {errorObj.hasOwnProperty('usernameTaken') && <Text style={styles.error}>Username already taken. Choose another username.</Text>}

                <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 24, marginBottom: 15, marginTop: 35}}>Let's get started!</Text>
                
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

                <Text style={[styles.input_heading, {color: 'black', width: 310, textAlign: 'right'}]}>
                    <Text>Already have an account ? </Text>
                    <Link push href="/"><Text style={{color: 'blue', textDecorationLine: 'underline'}}>Login</Text></Link></Text>

                <TouchableOpacity onPressIn={()=>{clickSignup_handler()}} style={styles.bttn}>
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '-15deg'}, {translateY: -5}]}} />
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '15deg'}, {translateY: 5}]}} />
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 17, marginLeft: 3}}>SIGN UP</Text>
                    </TouchableOpacity>
                <View style={{marginTop: 15, marginBottom: 20}}>
                    <Text style={styles.input_heading}>Or continue with:</Text>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("./google_icon.png")} resizeMode="contain" style={styles.alt_icon}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
