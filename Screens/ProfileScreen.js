import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProfileBody, ProfileButtons } from '../ScreenComp/ProfileBody'
import BottomTabView from '../ScreenComp/BottomTabView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../Firebase';
import { doc, onSnapshot } from 'firebase/firestore';


const ProfileScreen = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
      const cuser = auth.currentUser?.uid
      const docRef = doc(db, 'users', cuser)
      onSnapshot(docRef, (docs) => {
          setUser(docs.data())
      })
  }, [])
    
  // console.log(user)
  return (
    <SafeAreaView style={{color: 'white'}}>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      
        <ProfileBody
        name={user.name}
        accountName={user.username}
        profileImage={user == null ? null: user.profilePic}
        followers="35"
        following="36"
        post="42"
      />
      <ProfileButtons 
      id={0} 
      name={user.name} 
      accountName={user.username}
      profileImage={user == null ? null : user.profilePic}
      />

      <BottomTabView/>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})