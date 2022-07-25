import { StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../Firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const homeName = "Home";
const profileName = "Profile";
const searchName = "Search";

const Tab = createBottomTabNavigator();

function BottomContainer() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser != null) {
        const cuser = auth.currentUser?.uid;
        const docRef = doc(db, "users", cuser);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };
    getUser();
  }, []);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === searchName) {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === profileName) {
            return (
              <Image
                source={{ uri: user.profilePic }}
                style={styles.profilePic(focused)}
              />
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          paddingTop: 10,
          fontSize: 10,
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={searchName}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={profileName}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomContainer;

const styles = StyleSheet.create({
  profilePic: (focused) => ({
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: focused ? 2 : 0,
    borderColor: "black",
  }),
});
