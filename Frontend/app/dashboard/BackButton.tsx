import { router } from "expo-router"
import { View, Pressable, Text } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function BackButton() {
    return (
        <View>
            {router.canGoBack() && <Pressable onPressIn={()=>{router.back()}} style={{alignSelf: 'flex-start', flexDirection: 'row', marginTop: 15, marginLeft: 50}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="blue" />
                <Text style={{color: 'blue', fontSize: 18}}>Back</Text></Pressable>}
        </View>
    )
}