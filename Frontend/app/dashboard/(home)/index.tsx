
import { ScrollView, View, StyleSheet, Pressable, Text, TextInput, SafeAreaView } from "react-native"
import { useEffect, useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrLocation } from "@/utils/location";
import PlacesSearch from "@/components/PlacesSearch";
import LoadingScreen from "@/components/LoadingScreen";
import PetProfilesList from "@/components/PetProfilesList";
import { Link } from "expo-router";


export default function Home() {
    const [latLng, setLatLng] = useState("");
    const initialLatLng = useRef("");
    
    useEffect(()=>{
        async function initializeSearch() {
            let value = await AsyncStorage.getItem('last_search_latlng');
            if (value != null) {
                initialLatLng.current = value;
                }
            else {
                let geocode = await getCurrLocation();
                if (geocode != "") {
                    initialLatLng.current = geocode;
                    }
                else {
                    initialLatLng.current = "34.0549, 118.2426";
                    }
                }
            setLatLng(initialLatLng.current)
        }
        
        initializeSearch();
    }, []);

    if (initialLatLng.current == "") { return <LoadingScreen /> }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#f1f3f9'}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                <View style={{width: 300, paddingTop: 30, flexDirection: 'column-reverse'}}>
                    <PetProfilesList latLng={latLng} />
                    <PlacesSearch initialLatLng={initialLatLng.current} setLatLng={setLatLng} storeLatLngHistory={true} />
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 17, marginBottom: 5, paddingLeft: 15}}>Enter Location</Text>
                    <View style={{width: '50%', alignItems: 'flex-end', marginBottom: 20, alignSelf: 'flex-end'}}>
                        <Link href="./create-pet-profile">
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 17, textAlign: 'right', textDecorationLine: 'underline', color: 'grey'}}>Click here to create A Missing Pet Profile</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}