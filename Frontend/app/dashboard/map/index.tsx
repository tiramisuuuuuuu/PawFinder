
import PlacesSearch from "@/components/PlacesSearch";
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { getCurrLocation } from "@/utils/location"
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Constants from 'expo-constants';
import {Callout} from 'react-native-maps';
import { FilterModal, InfoModal } from "@/components/MapModals";
import { SightingModal } from "@/components/SightingModal";
import { LatLngContext } from '@/app/LatLngContext';


function CustomMarker({sighting, filterList, openSighting}) {
    let inFilterList = false;
    let filteredProfileIds = Object.keys(filterList);

    for (let i=0; i<filteredProfileIds.length; i++) {
        let profileId = filteredProfileIds[i];
        if (sighting.taggedProfiles.hasOwnProperty(profileId)) {
            inFilterList = true;
            }
        }
    let color = 'grey';
    let userArrs = Object.values(sighting.taggedProfiles);
    if (userArrs.length>0) { color = 'orange' }
    for (let i=0; i<userArrs.length; i++) {
        if (userArrs.length > 3) { color = 'limegreen' }
    }
    if (!(inFilterList) && filteredProfileIds.length>0) { return }
    return (
        <Marker coordinate={{latitude: Number(sighting.latitude), longitude: Number(sighting.longitude)}}>
            <MaterialCommunityIcons name="map-marker" size={50} color={color} />
            <Callout>
                <Pressable style={{width: 200, height: 180, backgroundColor: color}} onPressIn={()=>{openSighting(sighting._id)}}>
                    {sighting.photos.length>0 && <Image source={{ uri: sighting.photos[0]}} style={{width: '100%', height: 100}} />}
                    <Text ellipsizeMode="tail" numberOfLines={2} style={{width: '100%', fontFamily: 'Poppins-Regular', fontSize: 15}}>{sighting.description}</Text>
                    <View style={{flexDirection: "row", justifyContent: 'flex-end'}}>
                        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: 'blue'}}>Open Sighting</Text>
                        <MaterialCommunityIcons name="cursor-default-click-outline" size={30} color="blue" />
                    </View>
                </Pressable>
            </Callout>
        </Marker>
        )
}

async function getNearbySightings(lat: Number, lng: Number) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/getNearbySightings/`;
        const response = await fetch(targetUrl, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                latitude: lat,
                longitude: lng,
            }),
        })
        const arr = await response.json();
        return arr;
    } catch {
        console.log("network issue.");
        return null;
    }
}

export default function MapPage() {
    const [latLng, setLatLng] = useState("");
    const initialLatLng = useRef("");
    const [lat, lng] = latLng.split(", ");
    const [nearbySightings, setNearbySightings] = useState({});
    const [openInfo, setOpenInfo] = useState(false);
    const pageIsReady = useRef(false);
    const [openFilter, setOpenFilter] = useState(false);
    const filterList = useRef({}); //will list pet profile objects that are okay to be shown on the map, key = pet profile id
    const [activeSightingId, setActiveSightingId] = useState("");

    async function updateLatLng(geocode: String) {
        await AsyncStorage.setItem('maps_last_search_latlng', geocode);
        await setLatLng(geocode);
    }

    function updateFilters(newObj) {
        filterList.current = newObj;
    }

    async function getPins() {
        const resultsArr = await getNearbySightings(Number(lat), Number(lng));
        if (resultsArr != null) {
            let obj = {};
            for (let i=0; i<resultsArr.length; i++) {
                obj[resultsArr[i]._id] = resultsArr[i];
                }
            setNearbySightings(obj);
            } 
    }

    useEffect(()=>{
        if (latLng != "") { getPins() } 
    }, [latLng, filterList.current])

   
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
            <LatLngContext.Provider value={latLng}>
            <MapView region={{ latitude: Number(lat), longitude: Number(lng), latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                style={styles.map}>
                {Object.values(nearbySightings).map((sighting, index) => {
                    return ( <CustomMarker key={`sighting${index}`} sighting={sighting} filterList={filterList.current} openSighting={setActiveSightingId} />)
                })}

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
            {openFilter && <FilterModal setOpenFilter={setOpenFilter} filterList={filterList.current} updateFiltersRef={updateFilters} />}
            {openInfo && <InfoModal setOpenInfo={setOpenInfo} />}
            {nearbySightings[activeSightingId]!=null && <SightingModal sighting={nearbySightings[activeSightingId]} setActiveSightingObj={setActiveSightingId} updateSighting={getPins} />}
        </LatLngContext.Provider>
        </View>
    )

}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
});