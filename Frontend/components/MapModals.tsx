import { View, Text, Pressable } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PetProfileSelect from "@/components/PetProfileSelect";

export function Modal({ setOpenFunct, children }) {
    return (
        <View style={{position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(149, 165, 164, 0.8)'}}> 
            <Pressable onPress={()=>{setOpenFunct(false)}} style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 30}}>
                <MaterialCommunityIcons name="close" size={50} color="white" />
                <Text style={{fontFamily: 'LilitaOne-Regular', fontSize: 20, color: 'white'}}>Close</Text>
            </Pressable>
            {children}
        </View>
    )
}


export function FilterModal({ setOpenFilter, filterList, updateFiltersRef}) {
    return (
        <Modal setOpenFunct={setOpenFilter}> 
            <Text style={{fontFamily: "Poppins-Regular", fontSize: 20, width: 300, marginBottom: 30}}>Select a pet profile to filter by:</Text>
            <PetProfileSelect initialSelection={filterList} updateParentSelected={updateFiltersRef} path="map" disableActions={false} disableRemove={false} />
        </Modal>
    )
}


export function InfoModal({ setOpenInfo }) {
    return (
        <Modal setOpenFunct={setOpenInfo}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 20, padding: 20, color: 'blue'}}>
                <Text style={{fontSize: 25, textDecorationLine: 'underline'}}>Welcome to the community sightings board!</Text>
                <Text>{"\n\n"}Help tag sightings users have posted with pet profiles you believe they match with</Text>
                <Text>{"\n"}--OR-- Upvote tags that already exist on sightings!</Text>
                <Text>{"\n"}Select "filter" and visualize all tagged sightings collected for specific pet searches!</Text>
            </Text>
        </Modal>
    )
}