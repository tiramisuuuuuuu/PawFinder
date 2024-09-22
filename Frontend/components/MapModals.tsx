import PlacesSearch from "@/components/PlacesSearch";
import { ScrollView, View, Text, StyleSheet, Pressable, ImageBackground, Image } from "react-native"
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { getCurrLocation } from "@/utils/location"
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import PetProfileSelect, { DisplayProfile } from "@/components/PetProfileSelect";
import Constants from 'expo-constants';
import {Callout} from 'react-native-maps';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function Modal({ setOpenFunct, children }) {
    return (
        <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(149, 165, 164, 0.8)'}}> 
            <Pressable onPress={()=>{setOpenFunct(false)}} style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 30}}>
                <MaterialCommunityIcons name="close" size={50} color="white" />
                <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 20, color: 'white'}}>Close</Text>
            </Pressable>
            {children}
        </View>
    )
}


export function FilterModal({ setOpenFilter, filterList, updateFiltersRef}) {
    return (
        <Modal setOpenFunct={setOpenFilter}> 
            <Text style={{fontFamily: "Poppins-Regular", fontSize: 20, width: 300, marginBottom: 30}}>Select a pet profile to filter by:</Text>
            <PetProfileSelect initialSelection={filterList} updateParentSelected={updateFiltersRef} path="map" disableActions={false} disableRemove={false} />
        </Modal>
    )
}


export function InfoModal({ setOpenInfo }) {
    return (
        <Modal setOpenFunct={setOpenInfo}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, padding: 20, color: 'blue'}}>
                <Text style={{fontSize: 25, textDecorationLine: 'underline'}}>Welcome to the community sightings board!</Text>
                <Text>{"\n\n"}Help tag sightings users have posted with pet profiles you believe they match with</Text>
                <Text>{"\n"}--OR-- Upvote tags that already exist on sightings!</Text>
                <Text>{"\n"}Select "filter" and visualize all tagged sightings collected for specific pet searches!</Text>
            </Text>
        </Modal>
    )
}