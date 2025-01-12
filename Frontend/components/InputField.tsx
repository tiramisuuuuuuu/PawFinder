import { View, Text, StyleSheet } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';

export default function InputField({children, header, iconName, redBox, displayErrorMsg, ...props}) {
    return (
        <View style={styles.input_field}>
            <Text style={styles.input_heading}>
                <Text>{header}</Text>
                {displayErrorMsg && <Text style={{color: 'red'}}>{props.errorMsg}</Text>}
            </Text>

            <View style={[styles.div_input, {borderColor: (redBox || displayErrorMsg) ? 'red' : '#448da5'}]}>
                <Octicons name={iconName} style={styles.icon} />
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
});