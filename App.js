import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, TextInput,
  View, Image, SafeAreaView, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import BottomContainer from './Screens/BottomContainer';
import EditProfile from './ScreenComp/EditProfile';
import EditProfilePic from './ScreenComp/EditProfilePic';
import NewPost from './ScreenComp/Home/NewPost';
import Save from './ScreenComp/Home/Save';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="YiQiChi Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>
        <Stack.Screen name="EditProfilePic" component={EditProfilePic} />
        <Stack.Screen name="NewPost" component={NewPost} options={{
          headerBackTitleVisible: false, headerTitle: "New Post"
        }}/>
        <Stack.Screen name = "Save" component={Save}/>
        <Stack.Screen name="Main" component={BottomContainer} options={{headerShown: false}}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
});