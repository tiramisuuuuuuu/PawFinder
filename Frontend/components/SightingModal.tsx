import { Modal } from "./MapModals";
import { ScrollView, View, Text, Pressable, Image, StyleSheet } from "react-native"
import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PetProfileSelect from "@/components/PetProfileSelect";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PetProfileWidget from "./PetProfileWidget";
import { getPetProfileByID } from "@/utils/petProfileFunction";
import { addTaggedProfile } from "@/utils/sightingFunctions";


/*  When you click on a Sighting pin on the map, SightingModal renders a Modal screen that displays the 
    contents of Sighting data object. This includes a list petProfilesWidgets that were tagged to the 
    specific sighting by other users and that can be upvoted and it includes a section for the user to
    tag other petProfiles that they think may match with the sighting.
    @params
        @sighting: of type sighting Object
        @setActiveSightingId: function that takes a bool to indicate whether the modal is opened or closed
        @updateSighting: function from parent to update the sighting Object
*/

export default function SightingModal({ sighting, setActiveSightingId, updateSighting }) {
    const compIsReady = useRef(false);
    const userToken = useRef("")
    const [taggedProfiles, setTaggedProfiles] = useState([]);
    const [initialPetProfileSelection, setInitialPetProfileSelection] = useState({}); //object version of tagged profiles (key=profile._id)
    const [activeProfileId, setActiveProfileId] = useState("");
    const updatedTagsCount = useRef(0);
    let disableActions = (activeProfileId != "");

    // close the modal by updating the state of the parent
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


    // signal parent to look up updated sighting Obj, essentially to get SightingModal to rerender in order to update tags List
    useEffect(()=>{
        async function getUpdatedTags() {
            await updateSighting();
        }

        if (updatedTagsCount.current != 0) { getUpdatedTags() } 
    }, [updatedTagsCount.current])


    // resolves actions such as upvoting profiles or adding new profile tags indicated by activeProfileIdactiveProfileId
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
    }, [sighting]);

    return (
        <Modal setOpenFunct={setOpenFunct}>
            <View style={styles.modalBox}>
                {!compIsReady && <LoadingScreen />}
                {compIsReady && <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    <Text style={styles.header}>Sighting</Text>

                    <Image source={{ uri: sighting.sightingImg }} resizeMode="contain" style={styles.sightingImg} />

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailDiv}>
                            <Text style={styles.detailText} ellipsizeMode='tail' numberOfLines={3}>
                                <Text style={{color: 'grey'}}>Posted: </Text>
                                <Text>{sighting.date}</Text>
                            </Text>
                            <FontAwesome name="clock-o" style={styles.detailIcon} />
                        </View>
                        
                        <View style={styles.detailDiv}>
                            <Text style={styles.detailText}>
                                <Text style={{color: 'grey'}}>Last Seen: </Text>
                                <Text>{sighting.location}</Text>
                            </Text>
                            <FontAwesome name="map-pin" style={styles.detailIcon} />
                        </View>
                    </View>

                    <Text style={styles.sightingDescription}>{sighting.description}</Text>
                
                    <Text style={styles.tagsHeader}>Tagged Pet Profiles</Text>
                    
                    <View style={styles.taggedProfilesContainer}>
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
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <PetProfileWidget profile={profile} path="map" bgColor={bgColor}>
                                        <Pressable disabled={disableActions || userArr.includes(userToken.current)} onPress={()=>{setActiveProfileId(profile._id)}} style={{marginLeft: 15}}>
                                            <FontAwesome5 name="long-arrow-alt-up" size={35} color={iconColor} />
                                        </Pressable>
                                    </PetProfileWidget>

                                    <Text style={[styles.taggedProfileUpvoteCount, {color: bgColor}]}>{countText}</Text>
                                </View>
                            )})}
                    </View>

                    <Text style={styles.tagsHeader}>Add a new tag:</Text>

                    <PetProfileSelect initialSelection={initialPetProfileSelection} updateParentSelected={tagNewProfile} path="map" disableRemove={true} disableActions={disableActions} updateParentById={true} />
                    
                    <Text style={styles.footer}>PawFinder</Text>
                </ScrollView>}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBox: {
        width: 350,
        height: 500,
        padding: 20,
        backgroundColor: 'gainsboro',
        borderRadius: 20
    },
    header: {
        width: '100%', 
        textAlign: 'left', 
        fontFamily: 'Poppins-Regular', 
        fontSize: 20, 
        marginBottom: 10, 
        textDecorationLine: 'underline'
    },
    sightingImg: {
        width: '100%', 
        height: 200
    },
    detailsContainer: {
        flexDirection: 'row', 
        width: '100%', 
        height: 50, 
        marginTop: 20, 
        marginBottom: 20, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        columnGap: 10,
    },
    detailDiv: {
        flexDirection: 'column', 
        width: '50%', 
        alignItems: 'flex-start', 
        justifyContent: 'center',
    },
    detailText: {
        width: '100%',
        fontFamily: 'Poppins-Regular', 
        fontSize: 13,
        wordWrap: 'break-word',
    },
    detailIcon: {
        fontSize: 15,
        color: 'grey'
    },
    sightingDescription: {
        width: '100%', 
        textAlign: 'left', 
        fontFamily: 'Poppins-Regular', 
        fontSize: 15, 
        marginBottom: 30
    },
    tagsHeader: {
        fontFamily: "Poppins-Regular", 
        fontSize: 15, 
        width: 300, 
        marginBottom: 30
    },
    taggedProfilesContainer: {
        marginBottom: 20,
        rowGap: 10
    },
    taggedProfileUpvoteCount: {
        width: '100%', 
        fontFamily: 'Poppins-Regular', 
        fontSize: 15, 
        textAlign: 'right', 
    },
    footer: {
        width: '100%', 
        textAlign: 'right', 
        fontFamily: 'Poppins-Regular', 
        fontSize: 15
    }
});