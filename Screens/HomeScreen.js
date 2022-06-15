import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { useNavigation } from '@react-navigation/native'
import Header from '../ScreenComp/Home/Header';
import Post from '../ScreenComp/Home/Post'
import { ScrollView } from 'react-native-gesture-handler';
import { doc, collectionGroup, onSnapshot, query } from 'firebase/firestore'
import { POSTS } from '../dummyData/posts';
import BottomContainer from './BottomContainer';
const HomeScreen = () => {

  const [posts, setPosts] = useState([])
  // const navigation = useNavigation()

  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       navigation.replace("YiQiChi Login")
  //     })
  //     .catch(error => alert(error.message))
  // }
  
  const loadPosts = onSnapshot(collectionGroup(db, 'posts'), (snapshot) => {
    setPosts(snapshot.docs.map(doc => doc.data()))
  })

  useEffect(() => { 
    loadPosts
  })


  return (
    <SafeAreaView>
        <Header/>
        <ScrollView>
          { 
            posts.map((post, index) =>(
            <Post post={post} key={index} />
            ))
          }
        </ScrollView>
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