import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'
import SearchScreen from './SearchScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const homeName = 'Home';
const profileName = 'Profile';
const searchName = 'Search';

const Tab = createBottomTabNavigator();

function BottomContainer() {
  return (
    <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline'
                } else if (rn === searchName) {
                    iconName = focused ? 'search' : 'search-outline'
                } else if (rn === profileName) {
                    iconName = focused ? 'person' : 'person-outline'
                }

                return <Ionicons name={iconName} size={size} color={color}/>

            },

            "tabBarActiveTintColor": "#0782F9",
            "tabBarInactiveTintColor": "grey",
            "tabBarLabelStyle": {
                "paddingBottom": 10,
                "fontSize": 10
            },
            "tabBarStyle": [
                {
                 "display": "flex"
                },
                null
            ]
              
        })}
    >

        <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name={searchName} component={SearchScreen} options={{headerShown: false}}/>
        <Tab.Screen name={profileName} component={ProfileScreen} options={{headerShown: false}}/>

    </Tab.Navigator>
  );
}

export default BottomContainer

const styles = StyleSheet.create({})