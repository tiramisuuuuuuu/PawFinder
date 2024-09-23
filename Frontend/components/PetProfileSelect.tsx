import { Pressable, TextInput, View, Text, Image, ScrollView } from "react-native"
import { useEffect, useState, useRef, useContext } from "react";
import Constants from 'expo-constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LatLngContext } from "@/app/LatLngContext";

async function getPetProfileByID(id: String) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/getPetProfileByID/`;
        const response = await fetch(targetUrl, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                petToken: id,
            }),
        })
        const responseObj = await response.json();
        return responseObj;
    } catch {
        console.log("network issue.");
        return null;
    }
}

async function getNearbyPetProfiles(lat: Number, lng: Number) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/getNearbyPetProfiles/`;
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

export function DisplayProfile({profile, path, bgColor, children}) {
    return (
        <View style={{width: 300, height: 80, flexDirection: 'row', alignItems: 'center', backgroundColor: bgColor, borderRadius: 20, overflow: "hidden"}}>
            <Image source={{ uri: profile.photoUrl }} resizeMode="contain" style={{height: '100%', width: '30%', backgroundColor: 'grey'}} />
            <Text ellipsizeMode="tail" numberOfLines={2} style={{width: '40%', padding: 5, fontFamily: 'Poppins-Regular', fontSize: 15}}>
                <Text>{profile.petName}</Text>
                <Text style={{fontSize: 10}}>{"\n"+profile.petBreed}</Text>
            </Text>
            <View style={{width: '20%', flexDirection: 'row'}}>
                <Link href={`./${path}/view/${profile._id}`} onPress={()=>{console.log("view profile pressed")}}>
                    <MaterialCommunityIcons name="dog" size={30} color="orange" />
                </Link>
                {children}
            </View>
        </View>
    )
}

//initialSelection needed in order page is rerendered (by change of latlng) but prev selection should not disappear
export default function PetProfileSelect({initialSelection, updateParentSelected, path, disableRemove, disableActions, ...props}) { //parent should have a ref variable (to prevent unnecessary rerenders), selected (obj), and updateParentSelection should be a function to update the ref
    const latLng = useContext(LatLngContext);
    const [selected, setSelected] = useState(initialSelection);
    const [nearbyProfiles, setNearbyProfiles] = useState([]);
    const input = useRef("");
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(false);

    function removeSelection(id: String) {
        let obj = Object.assign({}, selected);
        delete obj[id];
        updateParentSelected(obj);
        setSelected(obj);
    }

    function addSelection(id, newObj) {
        let obj = Object.assign({}, selected);
        obj[id] = newObj;
        if (props.updateParentById) {
            updateParentSelected(id);
        }
        else {
            updateParentSelected(obj);
        }
        setSelected(obj);
    }

    useEffect(()=>{
        function updateComp(resultObj) {
            if (resultObj != null) {
                addSelection(resultObj._id, resultObj);
                setError(false);
                }
            else {
                setError(true);
                }
            setSearching(false);
        }

        async function search() {
            const resultObj = await getPetProfileByID(input.current);
            updateComp(resultObj);  
        }

        if (input.current != "" && searching) {search()};
    }, [searching])

    useEffect(()=>{
        setSelected(initialSelection);
    }, [initialSelection])

    useEffect(()=>{
        async function initialize() {
            if (latLng == "") { return }
            const [lat, lng] = latLng.split(', ')
            const resultsArr = await getNearbyPetProfiles(Number(lat), Number(lng));
            if (resultsArr != null) {
                setNearbyProfiles(resultsArr);
                }
        }

        initialize();
    }, [latLng])
    return (
        <View style={{width: 300, alignSelf: 'center', marginBottom: 15}}>
            <View style={{borderBottomWidth: 1, height: 45, borderRadius: 8, borderColor: 'grey', backgroundColor: 'grey'}}>
                <TextInput placeholder="Search by pet profile id" onChangeText={(newText)=>{input.current=newText}} onSubmitEditing={()=>{setSearching(true)}} editable={!searching} style={{width: 300, height: 40, marginBottom: 10, padding: 5, paddingLeft: 10, paddingRight: 10, fontFamily: 'Poppins-Regular', fontSize: 16, borderRadius: 7, borderColor: error ? 'red' : 'grey', backgroundColor: searching ? 'lavender' : 'white'}} />
            </View>
            {error && <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15, color: 'red', padding: 20, paddingTop: 0}}>** No search results found at this time.</Text>}
            <View style={{width: '100%', maxHeight: 300}}><ScrollView>
            <View style={{width: '100%', rowGap: 5}}>
                {Object.values(selected).map((profile)=>{ 
                    if (disableRemove && selected.hasOwnProperty(profile._id)) { return }
                    return (
                        <DisplayProfile profile={profile} path={path} bgColor="grey">
                            {!disableRemove && <Pressable disabled={disableActions} onPress={()=>{removeSelection(profile._id)}} style={{marginLeft: 15}}>
                                <MaterialCommunityIcons name="window-close" size={30} style={{color: disableActions ? 'lavender' : "black"}} />
                            </Pressable>}
                            {disableRemove && <Pressable disabled={true} style={{marginLeft: 15}}>
                                <FontAwesome5 name="long-arrow-alt-up" size={35} color="gainsboro" />
                            </Pressable>}
                        </DisplayProfile>
                    )} )}
            </View>
            <View style={{width: '100%', rowGap: 5}}>
                <Text style={{width: '100%', paddingLeft: 30, fontFamily: 'Poppins-Regular', fontSize: 15, color: 'grey', marginTop: 10}}>
                    <Text>Select From Nearby Pet Profiles</Text>
                    {nearbyProfiles.length==0 && <Text>...</Text>}</Text>
                {nearbyProfiles.map((profile)=>{ 
                    if (selected.hasOwnProperty(profile._id)) { return }
                    return (
                        <DisplayProfile profile={profile} path={path} bgColor="white">
                            <Pressable disabled={disableActions} onPress={()=>{addSelection(profile._id, profile)}} style={{marginLeft: 15}}>
                                <FontAwesome6 name="add" size={30} style={{color: disableActions ? 'lavender' : "black"}} />
                            </Pressable>
                        </DisplayProfile>    
                )} )}
            </View>
            </ScrollView></View>
        </View>
    )
}