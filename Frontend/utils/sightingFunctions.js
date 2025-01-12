import Constants from 'expo-constants';

export async function addTaggedProfile(sightingToken, petToken, userToken) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/addTaggedProfile/`;
        await fetch(targetUrl, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sightingToken: sightingToken,
                petToken: petToken,
                userToken: userToken
            }),
        })
        return
    } catch {
        console.log("network issue.");
    }
}