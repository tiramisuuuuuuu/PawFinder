
import { ScrollView, View, StyleSheet, Pressable, Text, TextInput } from "react-native"
import { useEffect, useState, useRef } from "react";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PlacesSearch from "@/components/PlacesSearch";
import LoadingScreen from "@/components/LoadingScreen";

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
    const [latLng, setLatLng] = useState("34.0549, 118.2426");
    const initialLatLng = useRef("");

    async function getCurrLocation() {                                                                                                                    
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return "";
        }
    
        let pos = (await Location.getCurrentPositionAsync({})).coords;
        let geocode = `${pos.latitude}, ${pos.longitude}`;
        await AsyncStorage.setItem('latlng', geocode);
        return geocode;
      }
    
    useEffect(()=>{
        async function initializeSearch() {
            let value = await AsyncStorage.getItem('last_search_latlng');
            if (value != null) {
                initialLatLng.current = value;
                setLatLng(value);
            }
            else {
                let geocode = await getCurrLocation();
                if (geocode != "") {
                    await AsyncStorage.setItem('last_search_latlng', geocode);
                    initialLatLng.current = geocode;
                    setLatLng(geocode);
                }
                else {
                    initialLatLng.current = latLng; //rerendering is not necessary as search results are already loaded for this place on mount
                }
                
            }
        }
        
        initializeSearch();
    }, [])

    if (initialLatLng.current == "") { return <LoadingScreen /> }
    return (
        <View style={{flex: 1, backgroundColor: '#f1f3f9'}}>
            <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                <View style={{width: 300, paddingTop: 50}}>
                    <PlacesSearch initialLatLng={initialLatLng.current} setLatLng={setLatLng} getCurrLocation={getCurrLocation} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});