import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import Constants from 'expo-constants';


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

export default function PetProfilesList({latLng}) {
    const [profiles, setPetProfiles] = useState([]);

    useEffect(()=>{
        async function initialize() {
            const [lat, lng] = latLng.split(', ')
            const resultsArr = await getNearbyPetProfiles(Number(lat), Number(lng));
            if (resultsArr != null) {
                setPetProfiles(resultsArr);
                }
        }

        initialize();
    }, [latLng])

    return (
        <View style={{width: '100%', marginTop: 30}}>
            <Text style={{width: '100%', fontFamily: 'LilitaOne-Regular', fontSize: 27, marginBottom: 20}}>{`(${profiles.length}) Missing Pets Near You`}</Text>
            {profiles.map((profile)=>{ return (
                <View style={styles.container} key={profile._id}>
                    <Image source={{ uri: profile.photoUrl }} resizeMode="contain" style={{width: '100%', height: '42%'}} />
                    <View style={{flex:1, width: '100%', borderTopWidth: 1, borderTopColor: 'grey', backgroundColor: '#e2e1e5', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: 20}}>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, marginRight: 15, fontWeight: 'bold'}}>{profile.petName}</Text>
                            {(profile.petSpecies=="dog" || profile.petSpecies=="cat") && <FontAwesome5 name={profile.petSpecies} size={20} color="orange" style={{marginRight: 15}} />}
                            <Text style={{flex: 1, fontFamily: 'Poppins-Regular', fontSize: 15}}>{profile.petBreed}</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: 10, alignItems: 'center', justifyContent: 'flex-start', columnGap: 5}}>
                            <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                                    <Text style={{color: 'grey'}}>Posted: </Text>
                                    <Text>{profile.postedDate}</Text>
                                </Text>
                                <FontAwesome name="clock-o" size={15} color="grey" style={{marginRight: 15}} />
                            </View>
                            <View style={{flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                                    <Text style={{color: 'grey'}}>Last Seen: </Text>
                                    <Text>{profile.lastSeen}</Text>
                                </Text>
                                <FontAwesome name="map-pin" size={15} color="grey" />
                            </View>
                        </View>
                        <Text ellipsizeMode='tail' numberOfLines={2} style={{width: '100%', textAlign: 'left', fontFamily: 'Poppins-Regular', fontSize: 15, marginBottom: 10}}>{profile. petDescription}</Text>
                        <Pressable style={{marginTop: 5, paddingTop: 5, paddingBottom: 5, paddingRight: 10, paddingLeft: 10, backgroundColor: 'teal', borderRadius: 10}}>
                            <Link href={`./view//${profile._id}`} onPress={()=>{console.log("start search pressed")}}>
                                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 15, color: 'white'}}>Start Search</Text>
                            </Link>
                        </Pressable>
                    </View>
                </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 350,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#c7bdde',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "grey",
        marginBottom: 40
    },
});