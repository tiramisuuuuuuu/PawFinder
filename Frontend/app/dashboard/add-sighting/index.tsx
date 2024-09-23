import AddSightingPage from "@/components/AddSightingPage";
import { View } from "react-native";

export default function AddSighting() {
    return (
        <View style={{flex: 1}}>
            <AddSightingPage initialSelection={{}} path="add-sighting" />
        </View>
    )
}