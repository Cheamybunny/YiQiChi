import { StyleSheet, View, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProfileBody, ProfileButtons } from '../ScreenComp/ProfileBody'
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../Firebase';
import { collectionGroup, getDocs, query, onSnapshot, where, doc } from 'firebase/firestore'
import BottomTabView from '../ScreenComp/BottomTabView';

const ProfileScreen = () => {
  const [user, setUser] = useState([])
  const [posts, setPosts] = useState([])

  
  useEffect(() => {
      const cuser = auth.currentUser?.uid
      const docRef = doc(db, 'users', cuser)
      onSnapshot(docRef, (docs) => {
          setUser(docs.data())}, (error) => {})
  }, [posts])
  const renderPost = ({item, index, separators}) => {
    loadPosts
    return (
    <View style ={{ width: '33.33%', height: 120,}}>
    <Image
        source={{uri: item.imageURL}}
        style={{ height: '100%', resizeMode: 'cover', }}
    />
   </View>)
  }
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