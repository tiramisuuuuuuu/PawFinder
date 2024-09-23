import { useLocalSearchParams } from "expo-router";
import AddSightingPage from "@/components/AddSightingPage";
import { View } from "react-native";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState, useRef } from "react";
import Constants from 'expo-constants';

async function getPetProfileByID(id: String) {
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

export default function AddSighting() {
    const { id } = useLocalSearchParams();
    const [pageIsReady, setPageIsReady] = useState(false);
    const initialSelection = useRef({});
    const petName = useRef("");

    useEffect(()=>{
        async function initialize() {
            const responseObj = await getPetProfileByID(id);
            if (responseObj != null) {
                let obj = {};
                obj[responseObj._id] = responseObj;
                initialSelection.current = obj;
                petName.current = responseObj.petName;
            }
            setPageIsReady(true);
        }

        initialize();
    }, [])

    if (!pageIsReady) { return ( <LoadingScreen /> ) }
    return (
        <View style={{flex: 1}}>
            <AddSightingPage initialSelection={initialSelection.current} path={""} name={petName.current} />
        </View>
    )
}