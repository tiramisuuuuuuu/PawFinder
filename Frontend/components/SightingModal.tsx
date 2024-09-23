import { Modal } from "./MapModals";
import { ScrollView, View, Text, Pressable, Image } from "react-native"
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PetProfileSelect, { DisplayProfile } from "@/components/PetProfileSelect";
import Constants from 'expo-constants';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';


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

async function addTaggedProfile(sightingToken, petToken, userToken) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/addTaggedProfile/`;
        await fetch(targetUrl, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sightingToken: sightingToken,
		        petToken: petToken,
		        userToken: userToken
            }),
        })
        return
    } catch {
        console.log("network issue.");
    }
}

export function SightingModal({ sighting, setActiveSightingId, updateSighting }) {
    const compIsReady = useRef(false);
    const userToken = useRef("")
    const [taggedProfiles, setTaggedProfiles] = useState([]);
    const [initialPetProfileSelection, setInitialPetProfileSelection] = useState({}); //object version of tagged profiles (key=profile._id)
    const [activeProfileId, setActiveProfileId] = useState("");
    const updatedTagsCount = useRef(0);
    let disableActions = (activeProfileId != "");


    function setOpenFunct(bool) {
        if (bool == false) {
            setActiveSightingId("");
        }
    }

    function tagNewProfile(profileId: String) {
        if (profileId != "") {
            setActiveProfileId(profileId);
        }
    }

    function updateTaggedProfiles(arr, obj: Object) {
        setInitialPetProfileSelection(obj);
        setTaggedProfiles(arr);
    }

    async function getTags() {
        let arr = [];
        let obj = {};
        let taggedProfileIds = Object.keys(sighting.taggedProfiles);
        for (let i=0; i<taggedProfileIds.length; i++) {
            const resultObj = await getPetProfileByID(taggedProfileIds[i]);
            if (resultObj != null) {
                obj[resultObj._id] = resultObj;
                arr.push(resultObj);
                } 
            }
        compIsReady.current = true;
        updateTaggedProfiles(arr, obj);
    }

    useEffect(()=>{
        async function getUpdatedTags() {
            await updateSighting();
        }

        if (updatedTagsCount.current != 0) { getUpdatedTags() } 
    }, [updatedTagsCount.current])

    useEffect(()=>{
        async function addTag() {
            await addTaggedProfile(sighting._id, activeProfileId, userToken.current);
            updatedTagsCount.current = updatedTagsCount.current+1;
            setActiveProfileId("");
        }

        if (activeProfileId != "") { addTag() } 
    }, [activeProfileId])

    useEffect(()=>{
        async function initialize() {
            let value = await AsyncStorage.getItem('token');
            if (value != null) {
                userToken.current = value;
                }
            await getTags();
        }

        initialize();
    }, []);
    return (
        <Modal setOpenFunct={setOpenFunct}>
            <View style={{width: 350, height: 500, padding: 20, backgroundColor: 'gainsboro', borderRadius: 20}}>
                {!compIsReady && <LoadingScreen />}
                {compIsReady && <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <Text style={{width: '100%', textAlign: 'left', fontFamily: 'Poppins-Regular', fontSize: 20, marginBottom: 10, textDecorationLine: 'underline'}}>Sighting</Text>
                    <Image source={{ uri: sighting.sightingImg }} resizeMode="contain" style={{width: '100%', height: 200}} />
                    <View style={{flexDirection: 'row', width: '100%', marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                            <Text style={{color: 'grey'}}>Posted: </Text>
                            <Text>{sighting.date}</Text>
                        </Text>
                        <FontAwesome name="clock-o" size={15} color="grey" style={{marginRight: 15}} />
                        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                            <Text style={{color: 'grey'}}>Location: </Text>
                            <Text>{sighting.location}</Text>
                        </Text>
                        <FontAwesome name="map-pin" size={15} color="grey" />
                    </View>
                    <Text style={{width: '100%', textAlign: 'left', fontFamily: 'Poppins-Regular', fontSize: 15, marginBottom: 30}}>{sighting.description}</Text>
                    
                    <Text style={{fontFamily: "Poppins-Regular", fontSize: 15, width: 300, marginBottom: 30}}>Tagged Pet Profiles</Text>
                    <View style={{marginBottom: 20, rowGap: 10}}>
                        {taggedProfiles.map((profile)=>{ 
                            let userArr = sighting.taggedProfiles[profile._id];
                            let countText = "=< 4 votes"
                            let bgColor = "darkorange"
                            let iconColor="black"
                            if (userArr.length > 4) {
                                countText="> 4 votes",
                                bgColor="limegreen"
                                }
                            if (disableActions) { iconColor="gainsboro" }
                            else if (userArr.includes(userToken.current)) { iconColor="green" }

                            return (
                                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 15}}>
                                    <DisplayProfile profile={profile} path="map" bgColor={bgColor}>
                                        <Pressable disabled={disableActions || userArr.includes(userToken.current)} onPress={()=>{setActiveProfileId(profile._id)}} style={{marginLeft: 15}}>
                                            <FontAwesome5 name="long-arrow-alt-up" size={35} color={iconColor} />
                                        </Pressable>
                                    </DisplayProfile>
                                    <Text style={{width: '100%', fontFamily: 'Poppins-Regular', fontSize: 15, textAlign: 'right', color: bgColor}}>{countText}</Text>
                                </View>
                            )})}
                        </View>
                        <Text style={{fontFamily: "Poppins-Regular", fontSize: 15, width: 300, marginBottom: 30}}>Add a new tag:</Text>
                        <PetProfileSelect initialSelection={initialPetProfileSelection} updateParentSelected={tagNewProfile} path="map" disableRemove={true} disableActions={disableActions} updateParentById={true} />
                        <Text style={{width: '100%', textAlign: 'right', fontFamily: 'Poppins-Regular', fontSize: 15}}>PawFinder</Text>
                    </ScrollView>}
                </View>
        </Modal>
    )
}