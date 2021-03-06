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
          setUser(docs.data())}, (error) => {})
  }, [])
  
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <ProfileBody
        name={user.name}
        accountName={user.username}
        profileImage={user.profilePic}
        followers={user.followers}
        following={user.following}
        post={user.post}
        bio={user.bio}
      />
      <ProfileButtons 
      id={0} 
      userDetails={user}
      />
      <BottomTabView/>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})