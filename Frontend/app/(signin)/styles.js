import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden",
        alignItems: 'center'
    },
    error: {
        width: "100%",
        color: 'red',
        backgroundColor: 'pink',
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    input_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    input: {
        fontFamily: 'Poppins-Regular',
        flex: 1,
        backgroundColor: 'white',
        fontSize: 13,
        color: 'grey',
    },
    bttn: {
        width: 130,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 5,
        marginTop: 30,
    },
    alt_icon: {
        width: 55,
        height: 50,
        marginTop: 15,
        backgroundColor: "white",
        borderRadius: 15
    }
});