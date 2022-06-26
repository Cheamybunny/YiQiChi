import { StyleSheet, SafeAreaView, FlatList, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import Header from '../ScreenComp/Home/Header';
import Post from '../ScreenComp/Home/Post'
import { collectionGroup, onSnapshot } from 'firebase/firestore'
const HomeScreen = () => {

  const [posts, setPosts] = useState([])
  
  const loadPosts = onSnapshot(collectionGroup(db, 'posts'), (snapshot) => {
    setPosts(snapshot.docs.map(doc => doc.data()))},
    (error) => {}
    )

  useEffect(() => { 
    loadPosts
  }, [])



  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
        <Header navigation/>
        <FlatList
          data={posts}
          renderItem={({item :post})=> <Post post = {post}/>}
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
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})