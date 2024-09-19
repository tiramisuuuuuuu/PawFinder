
import { ScrollView, View, StyleSheet, Pressable, Text, TextInput, SafeAreaView } from "react-native"
import { useEffect, useState, useRef } from "react";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlacesSearch from "@/components/PlacesSearch";
import LoadingScreen from "@/components/LoadingScreen";
import PetProfilesList from "@/components/PetProfilesList";


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
        <SafeAreaView style={{flex: 1, backgroundColor: '#f1f3f9'}}>
            <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                <View style={{width: 300, paddingTop: 50, flexDirection: 'column-reverse'}}>
                    <PetProfilesList latLng={latLng} />
                    <PlacesSearch initialLatLng={initialLatLng.current} setLatLng={setLatLng} getCurrLocation={getCurrLocation} />
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 17, marginBottom: 5, paddingLeft: 15}}>Enter Location</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});