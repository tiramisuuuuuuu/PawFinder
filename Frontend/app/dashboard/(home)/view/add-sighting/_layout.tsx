import { Stack } from "expo-router";

export default function MapPageLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="[id]" />
            <Stack.Screen name="view/[id]" />
        </Stack>
    )
}