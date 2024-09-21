import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export async function getCurrLocation() {                                                                                                                  
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return "";
    }

    let pos = (await Location.getCurrentPositionAsync({})).coords;
    let geocode = `${pos.latitude}, ${pos.longitude}`;
    await AsyncStorage.setItem('latlng', geocode);
    return geocode;
}

export async function getLocation(lat, long) {
    try {
        const targetUrl = `http://${Constants.expoConfig?.extra?.backendURL}/getLocation/`;
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