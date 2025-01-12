import { Image, StyleSheet, View } from "react-native";

 export default function Header() {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/images/pawfinder_header.png')} style={styles.headerImg}></Image>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    headerImg: {
        flex: 1,
        maxHeight: 100,
        resizeMode: 'contain'
    }
});