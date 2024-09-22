
import { useRef, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native"
import PetProfileSelect from "@/components/PetProfileSelect";
import { LatLngContext } from "@/app/LatLngContext";
import ImageSelect from "@/components/ImageSelect";

export default function AddSightingPage() {
    const taggedProfiles = useRef({}); // keys= profileObj._id & values= profileObj 
    const [latLng, setLatLng] = useState("10, 20");
    const [image, setImage] = useState(null);

    function updateTaggedProfiles(obj) {
        taggedProfiles.current = obj;
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <ImageSelect setImage={setImage} disableCamera={false} />
                <LatLngContext.Provider value={latLng}>
                    <PetProfileSelect initialSelection={taggedProfiles.current} updateParentSelected={updateTaggedProfiles} path="add-sighting" disableRemove={false} disableActions={false} />
                </LatLngContext.Provider>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        padding: 50
    },
});