import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";
import { getLocation } from "@/utils/location"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PlacesSearch({initialLatLng, setLatLng, getCurrLocation}) {
    const ref = useRef();
    const [editable, setEditable] = useState(false);
    const iconPressCount = useRef(0);
    
    async function selectLoc_handler(details) {
        if (details) {
            const geocode = `${details.geometry?.location.lat}, ${details.geometry?.location.lat}`;
            await AsyncStorage.setItem('last_search_latlng', geocode);
            setLatLng(geocode);
        }
    }
    async function pressIcon_handler() {
        iconPressCount.current=iconPressCount.current+1;
        setEditable(false);
    }

    useEffect(()=>{
        async function setCurrLocation() {
            console.log("getting current location");
            const geocode = await getCurrLocation();
            if (geocode != "") {
                await AsyncStorage.setItem('last_search_latlng', geocode);
                setLatLng(geocode);
                let [lat, long] = geocode.split(", ");
                const value = await getLocation(Number(lat), Number(long));
                await ref.current?.setAddressText(value); //must manually set text of google search bar
            }
            setEditable(true);
        }

        if (iconPressCount.current != 0) { setCurrLocation() }
    }, [iconPressCount.current])

    useEffect(()=>{
        async function initialize() {
            let [lat, long] = initialLatLng.split(", ");
            const value = await getLocation(Number(lat), Number(long));
            await ref.current?.setAddressText(value);
            setEditable(true);
        }

        initialize();
    }, [])

    return (
        <View style={{width: '100%', height: 50, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'}}>
            <View style={{width: '90%', height: 300, position: 'absolute', top: 0, left: 0}}>
                <GooglePlacesAutocomplete
                    ref={ref}
                    placeholder='Search a location'
                    fetchDetails={true}
                    onPress={(data, details = null) => { selectLoc_handler(details) }}
                    query={{
                        key: `${Constants.expoConfig?.extra?.googleMapsApiKey}`,
                        language: 'en',
                    }}
                    textInputProps={{
                        editable: editable,  // Disable the search bar
                    }}
                    styles={editable ? styles : inputUneditable_styles} />
            </View>
            <Pressable onPressIn={()=>{ pressIcon_handler() }} style={{width: '10%'}} disabled={!editable}><MaterialIcons name="my-location" size={30} color="#5360fd" /></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: 'grey',
        borderRadius: 5
    },
    textInput: {
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        backgroundColor: 'white'
    },
});

const inputUneditable_styles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: 'grey',
        borderRadius: 5
    },
    textInput: {
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        backgroundColor: '#e0e0e0'
    },
});