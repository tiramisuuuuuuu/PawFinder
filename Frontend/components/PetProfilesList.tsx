import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { getNearbyPetProfiles } from "@/utils/petProfileFunction";




/*  PetProfileList renders a list of Missing Pet profiles whose last seen locations are nearby 
    to the searched latLng ({lat, lng})
*/
export default function PetProfilesList({latLng}) {
    const [profiles, setPetProfiles] = useState([]); // list of pet profile Objects, whose data will be used to render

    
    // update profiles array with the nearby pet profiles to the latLng param
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
        <View style={styles.container}>
            <Text style={styles.profilesListHeader}>{`(${profiles.length}) Missing Pets Near You`}</Text>
            
            {profiles.map((profile)=>{ return (
                <View style={styles.profileDiv} key={profile._id}>
                    <Image source={{ uri: profile.photoUrl }} resizeMode="contain" style={styles.profileImg} />

                    <View style={styles.profileContentsContainer}>
                        <Text style={styles.petName} ellipsizeMode='tail' numberOfLines={2}>
                            {profile.petName}
                            {'  '}
                            <Text style={styles.petBreed}>{profile.petBreed}</Text>
                        </Text>

                        <View style={styles.profileDetailsContainer}>
                            <View style={styles.profileDetailDiv}>
                                <Text style={styles.profileDetailText}>
                                    <Text style={{color: 'grey'}}>Posted: </Text>
                                    <Text>{profile.postedDate}</Text>
                                </Text>
                                <FontAwesome name="clock-o" style={styles.profileDetailIcon} />
                            </View>
                            
                            <View style={styles.profileDetailDiv}>
                                <Text style={styles.profileDetailText} ellipsizeMode='tail' numberOfLines={2}>
                                    <Text style={{color: 'grey'}}>Last Seen: </Text>
                                    <Text>{profile.lastSeen}</Text>
                                </Text>
                                <FontAwesome name="map-pin" style={styles.profileDetailIcon} />
                            </View>
                        </View>

                        <Text ellipsizeMode='tail' numberOfLines={2} style={styles.petDescriptionContainer}>{profile.petDescription}</Text>
                        
                        <Link href={`./view//${profile._id}`} onPress={()=>{console.log("start search pressed")}} asChild>
                            <Pressable style={styles.profileBttn}>
                                <Text style={styles.profileBttnText}>Start Search</Text>
                            </Pressable>
                        </Link>
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
        marginTop: 30
    },
    profilesListHeader: {
        width: '100%', 
        fontFamily: 'LilitaOne-Regular', 
        fontSize: 25, 
        marginBottom: 20
    },
    profileDiv: {
        width: '100%',
        height: 370,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#c7bdde',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "grey",
        marginBottom: 40
    },
    profileImg: {
        width: '100%',
        height: '42%'
    },
    profileContentsContainer: {
        flex:1,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        backgroundColor: '#e2e1e5',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
    },
    petName: {
        width: '100%',
        fontFamily: 'Poppins-Regular', 
        fontSize: 20, 
        fontWeight: 'bold',
    },
    petBreed: {
        fontSize: 15
    },
    profileDetailsContainer: {
        flexDirection: 'row', 
        width: '100%', 
        height: 50, 
        marginBottom: 10, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        columnGap: 10,
    },
    profileDetailDiv: {
        flexDirection: 'column', 
        width: '50%', 
        alignItems: 'flex-start', 
        justifyContent: 'center',
    },
    profileDetailText: {
        width: '100%',
        fontFamily: 'Poppins-Regular', 
        fontSize: 13,
        wordWrap: 'break-word',
    },
    profileDetailIcon: {
        fontSize: 15,
        color: 'grey'
    },
    petDescriptionContainer: {
        width: '100%', 
        height: 50, 
        textAlign: 'left', 
        fontFamily: 'Poppins-Regular', 
        fontSize: 15, 
        marginBottom: 10
    },
    profileBttn: {
        marginTop: 5, 
        paddingTop: 5, 
        paddingBottom: 5, 
        paddingRight: 10, 
        paddingLeft: 10, 
        backgroundColor: 'teal', 
        borderRadius: 10
    },
    profileBttnText: {
        fontFamily: 'Poppins-Regular', 
        fontSize: 15, 
        color: 'white'
    }
});