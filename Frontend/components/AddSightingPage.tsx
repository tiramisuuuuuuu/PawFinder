
import { useRef, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable } from "react-native"
import PetProfileSelect from "@/components/PetProfileSelect";
import { LatLngContext } from "@/app/LatLngContext";
import ImageSelect from "@/components/ImageSelect";
import PlacesSearch from "@/components/PlacesSearch";
import { getCurrLocation, getLocation } from "@/utils/location";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import BackButton from "@/components/BackButton";

async function sendFormData(image, description, taggedProfileIds, location, latitude, longitude) {
    let formdata = new FormData();
    let userToken = await AsyncStorage.getItem('token');
        if (userToken == null) {
            return null;
        }

    formdata.append("sightingImg", image);
    formdata.append("userToken", userToken);
    formdata.append('description', description);
    formdata.append('petTokens', JSON.stringify(taggedProfileIds));
    formdata.append('location', location);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);

    let response = true;
    await fetch(`http://${Constants.expoConfig?.extra?.backendURL}/addSighting/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formdata,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("Sighting uploaded");
        })
        .catch((err) => {
            console.error("Error:", err);
            response = false;
        });
    return response;
}


export default function AddSightingPage({initialSelection, path, ...props}) {
    const [image, setImage] = useState(null);
    const [latLng, setLatLng] = useState("");
    const [initialLatLng, setInitialLatLng] = useState("");
    const [location, setLocation] = useState("");
    const searchBarRerenderCount = useRef(0);
    const taggedProfiles = useRef(initialSelection); // keys= profileObj._id & values= profileObj
    const description = useRef("");
    const [loading, setLoading] = useState(false);
    const submitted = useRef(false);
    const [emptyParams, setEmptyParams] = useState([]);
    const uploadError = useRef(false);


    function updateTaggedProfiles(obj) {
        taggedProfiles.current = obj;
    }

    function updateLocation(geocode, location) {
        setLatLng(geocode);
        setLocation(location);
    }

    function updateInitialLocation(geocode, location) {
        setInitialLatLng(geocode);
        setLatLng(geocode);
        setLocation(location);
    }

    async function setCurrLocation() {
        searchBarRerenderCount.current = searchBarRerenderCount.current + 1;
        console.log("getting current location");
        const geocode = await getCurrLocation();
        if (geocode != "") {
            let [lat, long] = geocode.split(", ");
            const value = await getLocation(Number(lat), Number(long));
            updateInitialLocation(geocode, value);
        }
    }

    function clickSubmitHandler() {
        let arr = []
        if (latLng == "") {
            arr.push("location");
            }
        if (description.current == "") {
            arr.push("description");
            }
        setEmptyParams(arr);
        if (arr.length == 0) { setLoading(true) }
        else { 
            uploadError.current = false;
            submitted.current = false
        }
    }

    useEffect(()=>{
        function updateStatesOnSuccess() {
            setImage(null);
            setLatLng("");
            setInitialLatLng("");
            setLocation("");
            searchBarRerenderCount.current = 0;
            taggedProfiles.current = {};
            description.current = "";
            submitted.current = true;
            uploadError.current = false;
            setLoading(false);
        }
        async function submitFormData() {
            let [lat, lng] = latLng.split(", ");
            let taggedProfileIds = Object.keys(taggedProfiles.current);
            const response = await sendFormData(image, description.current, taggedProfileIds, location, lat, lng);
            if (response) {
                updateStatesOnSuccess();
                return;
                }
            uploadError.current = true;
            setLoading(false);
        }

        if (loading) { submitFormData() }
    }, [loading])

    if (loading) { return (<LoadingScreen />) }
    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                <Pressable onPress={()=>{clickSubmitHandler()}} style={{marginTop: 5, marginBottom: 50, paddingTop: 5, paddingBottom: 5, paddingRight: 10, paddingLeft: 10, backgroundColor: 'teal', borderRadius: 10}}>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 25, color: 'white'}}>Submit</Text>
                </Pressable>
                <View>
                    <Text style={styles.text}>Tag pet profiles you believe match</Text>
                    <LatLngContext.Provider value={latLng}>
                        <PetProfileSelect initialSelection={taggedProfiles.current} updateParentSelected={updateTaggedProfiles} path={path} disableRemove={false} disableActions={false} />
                    </LatLngContext.Provider>
                </View>
                <View>
                    <Text style={styles.text}>
                        <Text style={{color: emptyParams.includes("description") ? 'red' : 'black'}}>Description</Text>
                        <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View style={styles.textInputDiv}>
                        <TextInput multiline={true} blurOnSubmit={true} placeholder="Add details about pet breed, your location, what's shown in uploaded images, etc." onChangeText={(newText)=>{description.current=newText}} style={[styles.text, styles.descriptionBox]} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>
                        <Text style={{color: emptyParams.includes("location") ? 'red' : 'black'}}>Enter sighting location</Text>
                        <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <PlacesSearch key={`sightingsSearchBar${searchBarRerenderCount.current}`} initialLatLng={initialLatLng} setLatLng={updateLocation} storeLatLngHistory={false} includeLocation={true} />
                </View>
                <View>
                    <Text style={styles.text}>Add an image:</Text>
                    <ImageSelect setImage={setImage} disableCamera={false} setCurrLocation={setCurrLocation} />
                </View>
                <Text style={{marginTop: 30, fontFamily: 'LilitaOne-Regular', fontSize: 30}}>Report a Lost Pet Sighting</Text>
                {Object.keys(initialSelection).length!=0 && <View style={{width: '100%'}}><BackButton name={props.name} /></View>}
                {submitted.current && <View style={{backgroundColor: 'limegreen', width: '100%', padding: 30, borderRadius: 40, flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, textAlign: 'center', color: 'purple'}}>"Successfully sumbitted sighting! Thank you for aiding the search!"</Text>
                    <MaterialCommunityIcons name="dog" size={50} color="darkorange" />
                </View>}
                {emptyParams.length > 0 && ( <Text style={styles.error}>
					Missing one or more required parameters.
				</Text>)}
                {uploadError.current && ( <Text style={styles.error}>
					Network issue occurred. Please try again later.
				</Text>)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        flexDirection: 'column-reverse',
        rowGap: 50,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        textAlign: 'left',
    },
    descriptionBox: {
        width: 300,
        height: 150,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 10,
    },
    textInputDiv: {
        borderBottomWidth: 6,
        borderRadius: 8,
        borderColor: 'grey',
        backgroundColor: 'grey'
    },
    error: {
        width: "100%",
        color: 'red',
        backgroundColor: 'pink',
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
});