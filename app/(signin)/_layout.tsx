import { Stack } from "expo-router";
export default function SigninLayout() {
    return (
        <Stack screenOptions={{headerShown: false, }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}