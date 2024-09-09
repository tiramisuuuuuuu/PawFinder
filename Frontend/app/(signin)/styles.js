import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#e0e0e0',
        overflow: "hidden",
    },
    error: {
        width: "100%",
        color: 'red',
        backgroundColor: 'pink',
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    input_field: {
        marginBottom: 15,
    },
    input_heading: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    div_input: {
        width: 310,
        height: 35,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 7,
        overflow: 'hidden',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 17,
        color: 'black',
        paddingRight: 10,
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