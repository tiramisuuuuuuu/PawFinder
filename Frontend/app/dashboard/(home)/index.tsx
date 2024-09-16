
import { ScrollView, View, StyleSheet, Pressable, Text, TextInput } from "react-native"
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function ZipCodeSearch({ setLocation }) {
    const [inputNull, setInputNull] = useState(false);

    function changeInput_handler(newText: string) {
        if (newText=="") { 
            setInputNull(true) }
        else { setInputNull(false) }
    }

    return (
        <View style={{width: '100%', marginTop: 20}}>
            {!inputNull && <Text style={{textAlign: "left", position: 'absolute', bottom: '100%', fontFamily: 'Poppins-Regular', color: 'grey'}}>Search Zipcode</Text>}
            <View style={{width: '100%', paddingTop: 5, flexDirection: 'row-reverse'}}>
                <MaterialIcons name="location-searching" size={20} color="black" />
                <TextInput placeholder="Enter zip code" onChangeText={(newText)=>{changeInput_handler(newText)}} onSubmitEditing={()=>{console.log("submitted")}} style={{flex: 1, borderBottomWidth: 2, borderBottomColor: 'grey', fontFamily: 'Poppins-Regular', marginRight: 10}}></TextInput>
            </View>
        </View>
    )
}

export default function Home() {
    const [location, setLocation] = useState("95616");

    async function getCurrLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return null;
            }

        let curr_loc = (await Location.getCurrentPositionAsync({})).coords;
        console.log(curr_loc.latitude);
        console.log(curr_loc.longitude);
    }

    useEffect(()=>{
        getCurrLocation()
    }, [])


    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{width: 300, paddingTop: 50}}>
                    <ZipCodeSearch setLocation={setLocation} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f3f9',
        alignItems: 'center',
    },
});