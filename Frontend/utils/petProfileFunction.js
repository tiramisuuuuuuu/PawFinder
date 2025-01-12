import Constants from 'expo-constants';

/*  Returns Missing Pet profiles in db whose last seen locations are nearby to a given lat lng
    @params 
        @lat: Number
        @lng: Number
    @returns an array of pet profile Objects
*/
export async function getNearbyPetProfiles(lat, lng) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/getNearbyPetProfiles/`;
        const response = await fetch(targetUrl, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                latitude: lat,
                longitude: lng,
            }),
        })
        const arr = await response.json();
        return arr;
    } catch {
        console.log("network issue.");
        return null;
    }
}

// @id: String
// @returns a pet profile Object
export async function getPetProfileByID(id) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/getPetProfileByID/`;
        const response = await fetch(targetUrl, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                petToken: id,
            }),
        })
        const responseObj = await response.json();
        return responseObj;
    } catch {
        console.log("network issue.");
        return null;
    }
}