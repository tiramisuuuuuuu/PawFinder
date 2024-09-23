import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';

export default function ImageSelect({ setImage, disableCamera, setCurrLocation }) {
    const [imageUri, setImageUri] = useState(null);

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].base64);
            setImageUri(result.assets[0].uri);
        }
    };

    async function takePhoto() {
        let status = await ImagePicker.requestCameraPermissionsAsync();
        if (status.granted == false) {
            console.log("Permissions denied");
            return;
          }
      
    
        let result = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (result == null) {
            result = await ImagePicker.getPendingResultAsync();
        }
        if (!(result.canceled)) {
            setImage(result.assets[0].base64);
            setCurrLocation();
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View>
            {imageUri==null && <View style={{width: 300, height: 200, flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgrey', borderColor: 'grey', borderWidth: 2, borderRadius: 10}}>
                {disableCamera==false && <Pressable onPress={()=>{takePhoto()}} style={{width: '50%', height: '100%', borderRightWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons name="camera-outline" size={80} color="black" />
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 17, textDecorationLine: 'underline'}}>Take a photo</Text>
                </Pressable>}
                <Pressable onPress={()=>{pickImage()}} style={{width: disableCamera ? '100%' : '50%', height: '100%', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 2, borderLeftColor: 'black'}}>
                    <MaterialIcons name="photo-library" size={70} color="black" style={{marginBottom: 5}}/>
                    <Text style={{fontFamily: 'Poppins-Regular', fontSize: 17, textDecorationLine: 'underline'}}>Upload a photo</Text>
                </Pressable>
            </View>}
            {imageUri!=null && <View style={{width: 300, height: 200, flexDirection: 'row', alignItems: 'center', backgroundColor: 'black', borderColor: 'grey', borderWidth: 2, borderRadius: 10}}>
                <Image source={{ uri: imageUri }} resizeMode='contain' style={{width: '100%', height: '100%'}}></Image>
            </View>}
            {imageUri!=null && <Pressable onPress={()=>{setImage(""); setImageUri(null)}} style={{alignSelf: 'flex-end'}}>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 17, color: 'blue', textDecorationLine: 'underline'}}>Remove Image</Text>
            </Pressable>}
        </View>
    )
}