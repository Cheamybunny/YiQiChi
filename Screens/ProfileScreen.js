import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProfileBody, ProfileButtons } from '../ScreenComp/ProfileBody'
import BottomTabView from '../ScreenComp/BottomTabView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../Firebase';
import { doc, onSnapshot } from 'firebase/firestore';


const ProfileScreen = () => {
<<<<<<< HEAD
  // const [user, setUser] = useState([])
  // useEffect(() => {
  //     const cuser = auth.currentUser?.uid
  //     const docRef = doc(db, 'users', cuser)
  //     onSnapshot(docRef, (docs) => {
  //         setUser(docs.data())
  //     })
  // }, [])
=======
  const [user, setUser] = useState([])
  useEffect(() => {
      const cuser = auth.currentUser?.uid
      const docRef = doc(db, 'users', cuser)
      onSnapshot(docRef, (docs) => {
          setUser(docs.data())}, (error) => {})
  }, [])
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
    
  // console.log(user)
  return (
    <SafeAreaView style={{color: 'white'}}>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      
        <ProfileBody
<<<<<<< HEAD
        name={'dummy'}
        accountName={'dummy'}
        profileImage={'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}
=======
        name={user.name}
        accountName={user.username}
        profileImage={ user == null ? null : user.profilePic}
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
        followers="35"
        following="36"
        post="42"
      />
      <ProfileButtons 
      id={0} 
<<<<<<< HEAD
      name={'dummy'} 
      accountName={'dummy'}
      profileImage={'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' }
=======
      name={user.name} 
      accountName={user.username}
      profileImage={ user == null ? null : user.profilePic }
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
      />

      <BottomTabView/>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})