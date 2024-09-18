import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getLocation } from "@/utils/location"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

export default function PlacesSearch({initialLatLng, setLatLng}) {
    const [defaultValue, setDefaultValue] = useState("");
    useEffect(()=>{
        async function initialize() {
            let [lat, long] = initialLatLng.split(", ");
            const value = await getLocation(Number(lat), Number(long));
            setDefaultValue(value);
        }

        initialize();
    }, [])
    return (
        <View style={{flex: 1}}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                onPress={(data, details = null) => {
                    console.log(data, details);
                    }}
                query={{
                    key: `${Constants.expoConfig?.extra?.googleMapsApiKey}`,
                    language: 'en',
                    }}
                defaultValue={defaultValue}
                />
        </View>
    )
}