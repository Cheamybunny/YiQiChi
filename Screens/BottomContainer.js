import { StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'
import SearchScreen from './SearchScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {auth, db} from '../Firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const homeName = 'Home';
const profileName = 'Profile';
const searchName = 'Search';

const Tab = createBottomTabNavigator();

function BottomContainer() {
<<<<<<< HEAD
    // const [user, setUser] = useState([])
    // useEffect(() => {
    //     const cuser = auth.currentUser?.uid
    //     const docRef = doc(db, 'users', cuser)
    //     const setCuser = async () => {
    //         const docSnap = await getDoc(docRef)
    //         if(docSnap.exists()) {
    //             console.log(docSnap)
    //         }
    //     }
    //     setCuser
    //     // onSnapshot(docRef, (docs) => {
    //     //     setUser(docs.data())
    //     // })
    // }, [])
=======
    const [user, setUser] = useState([])
    useEffect(() => {
        const cuser = auth.currentUser?.uid
        const docRef = doc(db, 'users', cuser)
        console.log(cuser)
        if (auth.currentUser != null ) {
            const getPic = onSnapshot(docRef, (docs) => {
            setUser(docs.data())}, (error) => {
                console.log("User is signed out")
            })
        } 
    }, [])
    const Tab = createBottomTabNavigator();
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
  return (

        <Tab.Navigator
            initialRouteName={profileName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === searchName) {
                        iconName = focused ? 'search' : 'search-outline'
                    } else if (rn === profileName) {
<<<<<<< HEAD
                        iconName = focused ? 'person' : 'person-outline'
                        //return <Image source={{uri: user == null ? 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg' : user.profilePic}} 
                        //style={styles.profilePic(focused)}/>                    
=======
                        // iconName = focused ? 'person' : 'person-outline'
                        return <Image source={{uri: user == null ? 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg' : user.profilePic}} 
                        style={styles.profilePic(focused)}/> 
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>

                },

                "tabBarActiveTintColor": "black",
                "tabBarInactiveTintColor": "grey",
                "tabBarShowLabel": false,
                "tabBarLabelStyle": {
                    "paddingTop": 10,
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