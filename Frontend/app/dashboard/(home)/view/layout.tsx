import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="[id]" />
            <Stack.Screen name="add-sighting" />
        </Stack>
    )
}