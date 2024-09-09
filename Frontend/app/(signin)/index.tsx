import { useFonts } from 'expo-font';
import { View, TextInput, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useContext, useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from "./styles";
import InputField from "./InputField";
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageLoadContext } from "../Context";


export default function SignIn() {
    const {pageIsReady, setPageIsReady} = useContext(PageLoadContext);
    const [loaded, error] = useFonts({
        'LilitaOne-Regular': require('../../assets/fonts/LilitaOne-Regular.ttf'),
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf')});
    const [loading, setLoading] = useState(false);
    const username = useRef("");
    const password = useRef("");
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
        async function sign_in() {
            //-----------------add sign up function here, plus error handling (setErrorObj)
            await AsyncStorage.setItem(['token', 12345]);
            router.replace("/dashboard");
            setLoading(false);
        }

        if (loading) { sign_in() }
        }, [loading]);


    function clickLogin_handler() {
        let err_obj = {};
        let emptyParams = []
        if (username.current=="") { emptyParams.push("username") }
        if (password.current=="") { emptyParams.push("password") }
        if (emptyParams.length != 0) {
            err_obj.emptyParams = emptyParams;
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
                <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 37, marginBottom: 25, marginTop: 100, width: 310, textAlign: 'left'}}>Welcome,</Text>

                <InputField header="Username" iconName="person" redBox={emptyParams.includes("username")} displayErrorMsg={false}>
                    <TextInput placeholder="Username" onChangeText={(newText)=>{username.current=newText}} style={styles.input} />
                    </InputField>

                <InputField header="Password" iconName="lock" redBox={emptyParams.includes("password")} displayErrorMsg={false}>
                    <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(newText)=>{password.current=newText}} style={styles.input} />
                    </InputField>

                <Text style={[styles.input_heading, {color: 'black', width: 310, textAlign: 'right'}]}>
                    <Text>Don't have an account ? </Text>
                    <Link push href="/signup"><Text style={{color: 'blue', textDecorationLine: 'underline'}}>Sign up</Text></Link></Text>

                <TouchableOpacity onPressIn={()=>{clickLogin_handler()}} style={styles.bttn}>
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '-15deg'}, {translateY: -5}]}} />
                    <MaterialCommunityIcons name="paw-outline" size={20} color="black" style={{transform: [{scaleY: 1.2}, {rotate: '15deg'}, {translateY: 5}]}} />
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 17, marginLeft: 3}}>LOG IN</Text>
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