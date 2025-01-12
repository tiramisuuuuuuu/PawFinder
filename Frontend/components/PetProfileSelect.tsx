import { Pressable, TextInput, View, Text, StyleSheet } from "react-native"
import { useEffect, useState, useRef, useContext } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LatLngContext } from "@/app/LatLngContext";
import PetProfileWidget from "./PetProfileWidget";
import { getNearbyPetProfiles, getPetProfileByID } from "@/utils/petProfileFunction";




/*  PetProfileSelect allows users to select pet Profiles from a list of nearby pet Profiles to the searched lat lng or 
    to select a pet profile by searched the id of the pet profile in a search bar. This function updates the 
    Selected-Pet-Profiles var of the parent
    @param
        @initialSelection: holds pet Profiles that the user previously selected and that is remembered by the parent,
            necessary in order to maintain list in case of rerenders of this component from lat Lng changes. An object
            containing keys of petProfile ids and values that are the profile data Objects
        @updateParentSelected: function to be able to update the selectedProfiles var of the parent
        @path: the base path to open up the pet profile pages
        @disableRemove: bool that toggles the functionality of petProfileSlect
            true means the profileSelect is meant for upvoting and replaces the remove action with the upvote symbol
            false means the profileSelect is meant for selecting tags and allows removing selections 
        @disableActions: bool that disable actions, upvoting or remove, until previous actions resolve
*/

export default function PetProfileSelect({initialSelection, updateParentSelected, path, disableRemove, disableActions, ...props}) { //parent should have a ref variable (to prevent unnecessary rerenders), selected (obj), and updateParentSelection should be a function to update the ref
    const latLng = useContext(LatLngContext); // get the {lat, lng} context of the parent (uses the place searches done from within the parent)
    const [selected, setSelected] = useState(initialSelection);
    const [nearbyProfiles, setNearbyProfiles] = useState([]);
    const input = useRef("");
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(false);
    
    function removeSelection(id: String) {
        let obj = Object.assign({}, selected); // makes a copy of selected
        delete obj[id];
        updateParentSelected(obj);
        setSelected(obj);
    }

    function addSelection(id: String, newObj: Object) {
        let obj = Object.assign({}, selected); // makes a copy of selected
        obj[id] = newObj;
        if (props.updateParentById) {
            updateParentSelected(id);
        }
        else {
            updateParentSelected(obj);
        }
        setSelected(obj);
    }


    // if searching state is true, get Searched Pet Profile and update the necessary state variables
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


    // ensure the component rerenders when the initialSelection param (a ref.current in the parent) changes
    useEffect(()=>{
        setSelected(initialSelection);
    }, [initialSelection])


    // initialize the nearbyPetProfiles list that users can select from
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
        <View style={styles.mainContainer}>
            <View style={styles.stylizedBorderBox}>
                <TextInput
                    placeholder="Search by pet profile id"
                    onChangeText={(newText)=>{input.current=newText}}
                    onSubmitEditing={()=>{setSearching(true)}}
                    editable={!searching}
                    style={[styles.inputBox, error ? styles.inputErrorBorder : styles.inputBoxBorder, searching ? styles.inputBoxDisabled : styles.inputBoxEnabled]} />
            </View>

            {error && <Text style={styles.searchErrorText}>No search results found at this time.</Text>}

            {!disableRemove && <View style={styles.selectedProfilesContainer}>
                {Object.values(selected).map((profile)=>{ 
                    return (
                        <PetProfileWidget profile={profile} path={path} bgColor="grey">
                            {!disableRemove && <Pressable disabled={disableActions} onPress={()=>{removeSelection(profile._id)}} style={styles.profileActionIconContainer}>
                                <MaterialCommunityIcons name="window-close" style={disableActions ? styles.disabledActionIcon : styles.enabledActionIcon} />
                            </Pressable>}
                        </PetProfileWidget>
                    )} )}
            </View>}

            <View style={styles.unselectedProfileContainer}>
                <Text style={styles.selectProfileInstruction}>
                    <Text>Select From Nearby Pet Profiles</Text>
                    {nearbyProfiles.length==0 && <Text>...</Text>}
                </Text>

                {nearbyProfiles.map((profile)=>{ 
                    if (selected.hasOwnProperty(profile._id)) { return }
                    return (
                        <PetProfileWidget profile={profile} path={path} bgColor="white">
                            <Pressable disabled={disableActions} onPress={()=>{addSelection(profile._id, profile)}} style={styles.profileActionIconContainer}>
                                <FontAwesome6 name="add" style={disableActions ? styles.disabledActionIcon : styles.enabledActionIcon} />
                            </Pressable>
                        </PetProfileWidget>    
                )} )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: 300,
        alignSelf: 'center',
        marginBottom: 15
    },
    stylizedBorderBox: {
        borderBottomWidth: 1, 
        height: 45, 
        borderRadius: 8, 
        borderColor: 'grey', 
        backgroundColor: 'grey'
    },
    inputBox: {
        width: 300, 
        height: 40, 
        marginBottom: 10, 
        padding: 5, 
        paddingLeft: 10, 
        paddingRight: 10, 
        fontFamily: 'Poppins-Regular', 
        fontSize: 16, 
        borderRadius: 7,
    },
    inputBoxBorder: {
        borderColor: 'grey'
    },
    inputErrorBorder: {
        borderColor: 'red'
    },
    inputBoxEnabled: {
        backgroundColor: 'white'
    },
    inputBoxDisabled: {
        backgroundColor: 'lavendar'
    },
    searchErrorText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: 'red',
        padding: 20,
        paddingTop: 0
    },
    selectedProfilesContainer: {
        width: '100%', 
        rowGap: 5,
        marginTop: 10
    },
    unselectedProfileContainer: {
        width: '100%',
        rowGap: 5,
        marginTop: 10
    },
    profileActionIconContainer: {
        marginLeft: 15
    },
    disabledActionIcon: {
        fontSize: 30,
        color: 'lavender'
    },
    enabledActionIcon: {
        fontSize: 30,
        color: 'black'
    },
    selectProfileInstruction: {
        width: '100%', 
        paddingLeft: 30, 
        fontFamily: 'Poppins-Regular', 
        fontSize: 15, 
        color: 'grey'
    }
    
});