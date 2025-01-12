import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Link } from "expo-router"
import { ReactNode } from "react"
import { ColorValue, Image, StyleSheet, Text, View } from "react-native"




export default function PetProfileWidget({profile, path, bgColor, children} : {profile: Object, path: String, bgColor: ColorValue, children: ReactNode}) {
    return (
        <View style={[styles.container, {backgroundColor: bgColor}]}>
            <Image source={{ uri: profile.photoUrl }} resizeMode="contain" style={styles.petImg} />

            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.petName}>
                <Text>{profile.petName}</Text>
                <Text style={styles.petBreed}>{"\n"+profile.petBreed}</Text>
            </Text>

            <View style={styles.icons}>
                <Link href={`./${path}/view/${profile._id}`} onPress={()=>{console.log("view profile pressed")}}>
                    <MaterialCommunityIcons name="dog" size={30} color="orange" />
                </Link>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300, 
        height: 80, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 20, 
        overflow: "hidden"
    },
    petImg: {
        height: '100%',
        width: '30%',
        backgroundColor: 'grey'
    },
    petName: {
        width: '40%', 
        padding: 5, 
        fontFamily: 'Poppins-Regular', 
        fontSize: 15
    },
    petBreed: {
        fontSize: 10
    },
    icons: {
        width: '20%', 
        flexDirection: 'row'
    }
});