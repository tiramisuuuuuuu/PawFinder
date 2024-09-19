import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

//  * @param userToken - token of user that's adding the profile
//  * @param petName - name of pet
//  * @param petSpecies - species of pet
//  * @param lastSeen - location the pet was last seen
//  * @param petDescription - description of the pet
//  * @param assignedTasks - tasks assigned
const profiles = [
    {
        petName: "Doug",
        petSpecies: "dog",
        petBreed: "Golden Retriever",
        posted: "09-01-24",
        lastSeen: "Safeway",
        petDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        assignedTasks: "please hold",
        photoUrl: "https://furballfiesta.com/wp-content/uploads/2023/10/DogsHavaneseHavanese-Puppy-Watercolor-Clipart-2.jpg",
        id: "123"
    },
    {
        petName: "Bob",
        petSpecies: "cat",
        petBreed: "Siamese",
        posted: "yesterday",
        lastSeen: "Safeway",
        petDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        assignedTasks: "please hold",
        photoUrl: "https://cdn.shopify.com/s/files/1/0416/8083/0620/files/01132022_soc_pinterestboardcoverupdate_CH_1200x1200_4ea79688-a3c1-4e16-beed-e57305950964_480x480.png?v=1651008658",
        id: "457"
    },
]
export default function PetProfilesList({latLng}) {

    return (
        <View style={{width: '100%', marginTop: 30}}>
            <Text style={{width: '100%', fontFamily: 'LilitaOne-Regular', fontSize: 27, marginBottom: 20}}>{`(${profiles.length}) Missing Pets Near You`}</Text>
            {profiles.map((profile)=>{ return (
                <View style={styles.container} key={profile.id}>
                    <Image source={{ uri: profile.photoUrl }} resizeMode="contain" style={{width: '100%', height: '42%'}} />
                    <View style={{flex:1, width: '100%', borderTopWidth: 1, borderTopColor: 'grey', backgroundColor: '#e2e1e5', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: 20}}>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: 20, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, marginRight: 15, fontWeight: 'bold'}}>{profile.petName}</Text>
                            {(profile.petSpecies=="dog" || profile.petSpecies=="cat") && <FontAwesome5 name={profile.petSpecies} size={20} color="orange" style={{marginRight: 15}} />}
                            <Text style={{flex: 1, fontFamily: 'Poppins-Regular', fontSize: 15}}>{profile.petBreed}</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '100%', marginBottom: 10, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                                <Text style={{color: 'grey'}}>Posted: </Text>
                                <Text>{profile.posted}</Text>
                            </Text>
                            <FontAwesome name="clock-o" size={15} color="grey" style={{marginRight: 15}} />
                            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 5}}>
                                <Text style={{color: 'grey'}}>Last Seen: </Text>
                                <Text>{profile.lastSeen}</Text>
                            </Text>
                            <FontAwesome name="map-pin" size={15} color="grey" />
                        </View>
                        <Text ellipsizeMode='tail' numberOfLines={2} style={{width: '100%', textAlign: 'left', fontFamily: 'Poppins-Regular', fontSize: 15, marginBottom: 10}}>{profile. petDescription}</Text>
                        <Pressable style={{marginTop: 5, paddingTop: 5, paddingBottom: 5, paddingRight: 10, paddingLeft: 10, backgroundColor: 'teal', borderRadius: 10}}>
                            <Link href={`./view//${profile.id}`} onPress={()=>{console.log("start search pressed")}}>
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