import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <View style={styles.mainContainer}>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7f7fff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabIconsContainer
        }}>
        <Tabs.Screen name="(home)" options={{
          title: "",
          tabBarIcon: ({color}) => <MaterialIcons name="home" color={color} style={styles.tabIcon} />}} />
        <Tabs.Screen name="add-sighting" options={{
          title: "",
          tabBarIcon: ({color}) => <MaterialIcons name="add-circle-outline" color={color} style={styles.tabIcon} />}} />
        <Tabs.Screen name="map" options={{
          title: "",
          tabBarActiveTintColor: '#ffc04c',
          tabBarIcon: ({color}) => <MaterialIcons name="map" color={color} style={styles.tabIcon} />}} />
        <Tabs.Screen name="profile" options={{
          title: "",
          tabBarIcon: ({color}) => <Ionicons name="person-circle-outline" color={color} style={styles.tabIcon} /> }} />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tabIconsContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 5
  },
  tabIcon: {
    width: 35,
    height: 35,
    fontSize: 35
  }
});