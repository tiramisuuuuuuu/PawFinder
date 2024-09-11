import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
      <View style={styles.container}>
        <Tabs screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#7f7fff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            paddingTop: 5,
            height: 80,
            },
          }}>
          <Tabs.Screen name="(home)" options={{
            title: "",
            tabBarIcon: ({color}) => <MaterialIcons name="home" size={35} color={color} />}} />
          <Tabs.Screen name="add-sighting" options={{
            title: "",
            tabBarIcon: ({color}) => <MaterialIcons name="add-circle-outline" size={35} color={color} />}} />
          <Tabs.Screen name="map" options={{
            title: "",
            tabBarActiveTintColor: '#ffc04c',
            tabBarIcon: ({color}) => <MaterialIcons name="map" size={35} color={color}/>}} />
          <Tabs.Screen name="profile" options={{
            title: "",
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