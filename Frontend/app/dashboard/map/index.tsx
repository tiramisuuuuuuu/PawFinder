
import PlacesSearch from "@/components/PlacesSearch";
import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native"
import MapView from 'react-native-maps';
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { getCurrLocation } from "@/utils/location"
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import PetProfileSelect from "@/components/PetProfileSelect";

export default function MapPage() {
    const [latLng, setLatLng] = useState("");
    const initialLatLng = useRef("");
    const [lat, lng] = latLng.split(", ");
    const [openInfo, setOpenInfo] = useState(false);
    const pageIsReady = useRef(false);
    const [openFilter, setOpenFilter] = useState(false);
    const filterList = useRef([]); //will list pet profile objects that are okay to be shown on the map

    async function updateLatLng(geocode: String) {
        await AsyncStorage.setItem('maps_last_search_latlng', geocode);
        await setLatLng(geocode);
    }

    function updateFilters(newObj) {
        filterList.current = newObj;
    }

    useEffect(()=>{
        async function initialize() {
            let value = await AsyncStorage.getItem('maps_opened');
            if (value == null) {
                await AsyncStorage.setItem('maps_opened', 'true');
                setOpenInfo(true);
                }
        }
        
        if (pageIsReady.current) { initialize() }
    }, [pageIsReady.current]);

    useEffect(()=>{
        async function initializeSearch() {
            let value = await AsyncStorage.getItem('maps_last_search_latlng');
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
            pageIsReady.current = true;
            setLatLng(initialLatLng.current);
        }
        
        initializeSearch();
    }, []);

    if (initialLatLng.current == "") { return <LoadingScreen /> }
    return (
        <View style={{flex: 1}}>
            <MapView 
                region={{
                    latitude: Number(lat),
                    longitude: Number(lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                style={styles.map}>

            </MapView>
            <View style={{width: "100%", position: 'absolute', top: 0, alignItems: 'flex-end', paddingTop: 30, rowGap: 20, backgroundColor: 'rgba(50,50,50,0.4)'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%', columnGap: 10, paddingLeft: 20, paddingRight: 20}}>
                    <PlacesSearch initialLatLng={initialLatLng.current} setLatLng={updateLatLng} storeLatLngHistory={false} />
                    <Pressable onPress={()=>{setOpenInfo(true)}}>
                        <Octicons name="info" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
            <Pressable onPress={()=>{setOpenFilter(true)}} style={{marginRight: 20, position: 'absolute', top: 100, right: 10}}>
                <MaterialIcons name="filter-list-alt" size={45} color="black" />
            </Pressable>
            {openFilter && <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(149, 165, 164, 0.8)'}}> 
                <Pressable onPress={()=>{setOpenFilter(false)}} style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 30}}>
                    <MaterialCommunityIcons name="close" size={50} color="white" />
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 20, color: 'white'}}>Close</Text>
                </Pressable>
                <Text style={{fontFamily: "Poppins-Regular", fontSize: 20, width: 300, marginBottom: 30}}>Select a pet profile to filter by:</Text>
                <PetProfileSelect initialSelection={filterList.current} updateParentSelected={updateFilters} latLng={latLng} path="map" />
            </View>}
            {openInfo && <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(50,50,50, 0.2)'}}>
                <Pressable onPress={()=>{setOpenInfo(false)}} style={{position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="close" size={50} color="white" />
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 20, color: 'white'}}>Close</Text>
                </Pressable>
                <View style={{width: "90%", position: 'absolute', top: 100, alignSelf: 'center', padding: 20, backgroundColor: 'rgba(149, 165, 164, 0.8)', borderRadius: 20}}>
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 35}}>Welcome to the community sightings board!</Text>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20}}>Help tag sightings users have posted with pet profiles you suspect they correspond to</Text>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20}}>{"\n"}--OR-- Help attest tags that already exist on sightings!</Text>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20}}>{"\n"}Select "filter" and visualize all tagged sightings collected for specific pet searches!</Text>
                </View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
});