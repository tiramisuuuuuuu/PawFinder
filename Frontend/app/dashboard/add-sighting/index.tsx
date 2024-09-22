
import { useRef } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native"
import PetProfileSelect from "@/components/PetProfileSelect";

export default function AddSightingPage() {
    const selected = useRef({})

    function updateSelected(obj) {
        selected.current = obj;
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                <PetProfileSelect initialSelection={selected.current} updateParentSelected={updateSelected} latLng="34.0549, 118.2426" path="add-sighting" disableRemove={false}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
    },
});