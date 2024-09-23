import { router } from "expo-router"
import { View, Pressable, Text } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function BackButton(props) {
    return (
        <View>
            {!(props.name) && router.canGoBack() && <Pressable onPressIn={()=>{router.back()}} style={{alignSelf: 'flex-start', flexDirection: 'row', marginTop: 15, marginLeft: 50, alignItems: 'center'}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="blue" />
                <Text style={{color: 'blue', fontFamily: 'LilitaOne-Regular', fontSize: 25}}>Back</Text></Pressable>}
            {(props.name) && router.canGoBack() && <Pressable onPressIn={()=>{router.back()}} style={{alignSelf: 'flex-start', flexDirection: 'row', marginTop: 15, marginLeft: 50, alignItems: 'center'}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="blue" />
                <Text style={{color: 'blue', fontFamily: 'LilitaOne-Regular', fontSize: 25}}>{`${props.name}'s Search`}</Text></Pressable>}
        </View>
    )
}