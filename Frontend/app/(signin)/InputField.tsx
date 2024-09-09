import { View, Text, StyleSheet } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import { styles } from "./styles";

export default function InputField({children, header, iconName, redBox, displayErrorMsg, ...props}) {
    return (
        <View style={styles.input_field}>
            <Text style={styles.input_heading}>
                <Text>{header}</Text>
                {displayErrorMsg && <Text style={{color: 'red'}}>{props.errorMsg}</Text>}</Text>
            <View style={[styles.div_input, {borderColor: (redBox || displayErrorMsg) ? 'red' : '#448da5'}]}>
                <Octicons name={iconName} style={styles.icon} />
                {children}</View></View>
    )
}
