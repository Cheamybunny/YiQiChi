<<<<<<< HEAD
import { StyleSheet, SafeAreaView, Text, View, FlatList, Image} from 'react-native';
=======
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import Header from '../ScreenComp/Home/Header';
import Post from '../ScreenComp/Home/Post'
import { ScrollView } from 'react-native-gesture-handler';
import { collectionGroup, onSnapshot } from 'firebase/firestore'
import { POSTS } from '../dummyData/posts';
import { View } from 'react-native-web';
const HomeScreen = () => {

  const [posts, setPosts] = useState([])


  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       navigation.replace("YiQiChi Login")
  //     })
  //     .catch(error => alert(error.message))
  // }
  
  const loadPosts = onSnapshot(collectionGroup(db, 'posts'), (snapshot) => {
    setPosts(snapshot.docs.map(doc => doc.data()))},
    (error) => {}
    )

  useEffect(() => { 
    loadPosts
  })



  return (
    <SafeAreaView>
        <Header/>
        <FlatList
<<<<<<< HEAD
          data={POSTS}
          renderItem={({item :post})=> 
          <Post post = {post}/>}
=======
          data={posts}
          renderItem={({item :post})=> <Post post = {post}/>}
>>>>>>> 035195d879b278caf347a0b24208a40b59027e82
          />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})