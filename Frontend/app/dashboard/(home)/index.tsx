
import { ScrollView, View, Text, SafeAreaView, StyleSheet } from "react-native"
import { useEffect, useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrLocation } from "@/utils/location";
import PlacesSearch from "@/components/PlacesSearch";
import LoadingScreen from "@/components/LoadingScreen";
import PetProfilesList from "@/components/PetProfilesList";
import { Link } from "expo-router";

/* 
    Home creates a page that displays pet profiles with last seen locations that match the 
    specified search location. It also contains links to the Create Missing Pet Profile page
    and Message Box page.
*/

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
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                <View style={styles.contentContainer}>
                    <PetProfilesList latLng={latLng} />
                    <PlacesSearch initialLatLng={initialLatLng.current} setLatLng={setLatLng} storeLatLngHistory={true} />
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 17, marginBottom: 5, paddingLeft: 15}}>Enter Location</Text>
                    <View style={{width: '50%', alignItems: 'flex-end', marginBottom: 20, alignSelf: 'flex-end'}}>
                        <Link href="./create-pet-profile">
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15, textAlign: 'right', textDecorationLine: 'underline', color: 'grey'}}>Click here to create A Missing Pet Profile</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        width: 300,
        paddingTop: 30,
        flexDirection: 'column-reverse'
    }
});