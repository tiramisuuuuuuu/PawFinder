import { useLocalSearchParams } from "expo-router";
import { ScrollView, View, StyleSheet, Text, ImageBackground, Modal, Pressable, Image } from "react-native"
import BackButton from "@/components/BackButton";
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";

async function getPetProfileByID(id: String) {
    try {
        console.log("trying here")
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
        console.log(responseObj)
        return responseObj;
    } catch {
        console.log("network issue.");
        return null;
    }
}

export default function Home() {
    const { id } = useLocalSearchParams();
    const [profile, setProfile] = useState({});
    const [magnifyImage, setMagnifyImage] = useState(false);

    useEffect(()=>{
        async function initialize() {
            const resultObj = await getPetProfileByID(id);
            if (resultObj != null) {
                setProfile(resultObj);
            }
        }

        initialize();
    }, [id])
    return (
        <View style={{flex: 1, backgroundColor: '#e0e0e0'}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <View style={styles.container}>
                    <View style={{width: '100%'}}>
                        <BackButton />
                        <ImageBackground source={{uri: profile.photoUrl}} resizeMode="cover" style={{width: '100%', maxWidth: 400, height: 200, marginTop: 50}}>
                            <Pressable onPress={()=>{setMagnifyImage(true)}} style={{position: 'absolute', right: 20, bottom: 10}}>
                                <MaterialCommunityIcons name="magnify-expand" size={40} color="black" />
                            </Pressable>
                        </ImageBackground>
                    </View>
                    <View style={{flex:1, width: '100%', backgroundColor: 'floralwhite', borderTopWidth: 1, borderTopColor: 'black', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: 20}}>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, marginRight: 15, fontWeight: 'bold'}}>{profile.petName}</Text>
                            {(profile.petSpecies=="dog" || profile.petSpecies=="cat") && <FontAwesome5 name={profile.petSpecies} size={20} color="orange" style={{marginRight: 15}} />}
                            <Text style={{flex: 1, fontFamily: 'Poppins-Regular', fontSize: 15}}>{profile.petBreed}</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                                <Text style={{color: 'grey'}}>Posted: </Text>
                                <Text>{profile.postedDate}</Text>
                            </Text>
                            <FontAwesome name="clock-o" size={15} color="grey" style={{marginRight: 15}} />
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                                <Text style={{color: 'grey'}}>Last Seen: </Text>
                                <Text>{profile.lastSeen}</Text>
                            </Text>
                            <FontAwesome name="map-pin" size={15} color="grey" />
                        </View>
                        <Text style={{width: '100%', textAlign: 'left', fontFamily: 'Poppins-Regular', fontSize: 15, marginBottom: 10}}>{profile. petDescription}</Text>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{maxWidth:'40%', marginRight: 5}}>
                                <Text style={styles.text}>Owner</Text>
                                <Text style={styles.text}>{profile.username}</Text>
                            </View>
                            <View style={{maxWidth:'40%', marginLeft: 5}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>Phone </Text>
                                    <FontAwesome5 name="phone-alt" size={15} color="black" /></View>
                                <Text style={[styles.text, {color: 'grey'}]}>{profile.contact}</Text>
                            </View>
                        </View>
                        <Text style={{marginTop: 20, width: '100%', fontFamily: 'LilitaOne-Regular', fontSize: 20, paddingLeft: 10}}>Assigned Tasks</Text>
                        <Text style={[{marginTop: 30}, styles.text]}>{`**${profile.assignedTasks}**`}</Text>
                    </View>
                </View>
                
            </ScrollView>

            {magnifyImage && <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(149, 165, 164, 0.8)'}}>
            <Image source={{uri: profile.photoUrl}} resizeMode="contain" style={{width: '100%', maxWidth: 400, aspectRatio: 1, height: undefined, backgroundColor: 'transparent', borderWidth: 3, borderRadius: 20, borderColor: 'grey'}} />
                <Pressable onPress={()=>{setMagnifyImage(false)}} style={{position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="close" size={50} color="white" />
                    <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 20, color: 'white'}}>Close</Text></Pressable>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    text: {
        fontFamily: 'Poppins-Regular', fontSize: 15, marginRight: 5
    }
});