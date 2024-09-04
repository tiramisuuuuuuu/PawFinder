import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
      <View style={styles.container}>
        <Tabs screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            paddingTop: 5,
            height: 80,
            },
          }}>
          <Tabs.Screen name="(home)" options={{
            title: "",
            tabBarActiveTintColor: 'blue',
            tabBarIcon: ({color}) => <Ionicons name="paw" size={35} color={color} />}} />
          <Tabs.Screen name="report" options={{
            title: "",
            tabBarActiveTintColor: 'green',
            tabBarIcon: ({color}) => <Ionicons name="add-circle-outline" size={35} color={color} />}} />
          <Tabs.Screen name="map" options={{
            title: "",
            tabBarActiveTintColor: 'orange',
            tabBarIcon: ({color}) => <Ionicons name="map-outline" size={35} color={color}/>}} />
          <Tabs.Screen name="profile" options={{
            title: "",
            tabBarActiveTintColor: 'pink',
            tabBarIcon: ({color}) => <Ionicons name="person-circle-outline" size={35} color={color}/> }} />
        </Tabs>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});