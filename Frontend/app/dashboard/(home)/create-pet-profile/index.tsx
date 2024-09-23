
import { useRef, useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable } from "react-native"
import ImageSelect from "@/components/ImageSelect";
import PlacesSearch from "@/components/PlacesSearch";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import BackButton from "@/components/BackButton";

async function sendFormData(image, contactName, contact, petName, petBreed, description, assignedTasks, location, latitude, longitude) {
    let formdata = new FormData();
    let userToken = await AsyncStorage.getItem('token');
        if (userToken == null) {
            return false;
        }

    formdata.append("userToken", userToken);
    formdata.append("username", contactName);
    formdata.append("contact", contact);
    formdata.append("petName", petName);
    formdata.append("petBreed", petBreed);
    formdata.append("petDescription", description);
    formdata.append("assignedTasks", assignedTasks);
    formdata.append("petImage", image);
    formdata.append("lastSeen", location);
    formdata.append("longitude", longitude);
    formdata.append("latitude", latitude);

    let response = true;
    await fetch(`http://${Constants.expoConfig?.extra?.backendURL}/addPetProfile/`, {
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
            console.log("Pet profile uploaded");
        })
        .catch((err) => {
            console.error("Error:", err);
            response = false;
        });
    return response;
}


export default function AddSightingPage() {
    const [image, setImage] = useState("");
    const [latLng, setLatLng] = useState("");
    const [initialLatLng, setInitialLatLng] = useState("");
    const [location, setLocation] = useState("");
    const description = useRef("");
    const contactName = useRef("");
    const contact = useRef("");
    const petName = useRef("");
    const petBreed = useRef("");
    const assignedTasks = useRef("");
    const [loading, setLoading] = useState(false);
    const submitted = useRef(false);
    const [emptyParams, setEmptyParams] = useState([]);
    const uploadError = useRef(false);


    function updateLocation(geocode, location) {
        setLatLng(geocode);
        setLocation(location);
    }

    function clickSubmitHandler() {
        let arr = []
        if (latLng == "") {
            arr.push("location");
            }
        if (description.current == "") {
            arr.push("description");
            }
        if (petBreed.current == "") {
            arr.push("petBreed");
            }
        if (petName.current == "") {
            arr.push("petName");
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
            setImage("");
            setLatLng("");
            setInitialLatLng("");
            setLocation("");
            description.current = "";
            contactName.current = "";
            contact.current = "";
            petName.current = "";
            petBreed.current = "";
            assignedTasks.current = "";
            submitted.current = true;
            uploadError.current = false;
            setLoading(false);
        }
        async function submitFormData() {
            let [lat, lng] = latLng.split(", ");
            const response = await sendFormData(image, contactName.current, contact.current, petName.current, petBreed.current, description.current, assignedTasks.current, location, lat, lng);
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
                    <Text style={styles.text}>Contact Name</Text>
                    <View style={styles.textInputDiv}>
                        <TextInput blurOnSubmit={true} placeholder="Your display name" onChangeText={(newText)=>{contactName.current=newText}} style={[styles.text, styles.box]} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Contact Info</Text>
                    <View style={styles.textInputDiv}>
                        <TextInput blurOnSubmit={true} placeholder="Email address, phone #, etc." onChangeText={(newText)=>{contact.current=newText}} style={[styles.text, styles.box]} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Assigned Tasks</Text>
                    <Text style={[styles.text, {marginLeft: 15, color: 'grey'}]}>- add a sighting if seen (default)</Text>
                    <View style={styles.textInputDiv}>
                        <TextInput multiline={true} blurOnSubmit={true} placeholder="Hold on to pet, Contact me, etc." onChangeText={(newText)=>{assignedTasks.current=newText}} style={[styles.text, styles.descriptionBox]} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>
                        <Text style={{color: emptyParams.includes("description") ? 'red' : 'black'}}>Description</Text>
                        <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View style={styles.textInputDiv}>
                        <TextInput multiline={true} blurOnSubmit={true} placeholder="Add details on pet's personality, habits, or distinguishing features" onChangeText={(newText)=>{description.current=newText}} style={[styles.text, styles.descriptionBox]} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>
                        <Text style={{color: emptyParams.includes("petBreed") ? 'red' : 'black'}}>Pet's Breed</Text>
                        <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View style={styles.textInputDiv}>
                        <TextInput blurOnSubmit={true} placeholder="Golden retriever, Siamese, etc." onChangeText={(newText)=>{petBreed.current=newText}} style={[styles.text, styles.box]} />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Pet's image: (recommended)</Text>
                    <ImageSelect setImage={setImage} disableCamera={true} setCurrLocation={()=>{}} />
                </View>
                <View>
                    <Text style={styles.text}>
                        <Text style={{color: emptyParams.includes("location") ? 'red' : 'black'}}>Last seen location</Text>
                        <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <PlacesSearch initialLatLng={initialLatLng} setLatLng={updateLocation} storeLatLngHistory={false} includeLocation={true} />
                </View>
                <View>
                    <Text style={styles.text}>
                        <Text style={{color: emptyParams.includes("petName") ? 'red' : 'black'}}>Pet's Name:</Text>
                        <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View style={styles.textInputDiv}>
                        <TextInput blurOnSubmit={true} placeholder="Enter pet's name" onChangeText={(newText)=>{petName.current=newText}} style={[styles.text, styles.box]} />
                    </View>
                </View>

                <Text style={{marginTop: 30, fontFamily: 'LilitaOne-Regular', fontSize: 30}}>Create a Missing Pet Profile</Text>
                <View style={{width: '100%'}}><BackButton /></View>
                {submitted.current && <View style={{backgroundColor: 'limegreen', width: '100%', padding: 30, borderRadius: 40, flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, textAlign: 'center', color: 'purple'}}>"Successfully sumbitted missing pet profile"</Text>
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
    box: {
        width: 300,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 10,
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