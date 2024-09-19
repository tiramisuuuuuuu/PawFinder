import Constants from 'expo-constants';

export async function getLocation(lat, long) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/getLocation/`;
        console.log(targetUrl)
        const response = await fetch(targetUrl, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                latitude: lat,
                longitude: long,
            }),
        })
        const responseObj = await response.json()
        if (!responseObj.hasOwnProperty("results") || responseObj.results.length == 0) {
            console.log("error reverse encoding latitude and longitude");
            return `${lat}, ${long}`;
            }
        return responseObj.results[0].formatted_address;
    } catch {
        console.log("error calling location api");
        return `${lat}, ${long}`;
    }
}