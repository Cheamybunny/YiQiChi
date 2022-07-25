import { StyleSheet, View , ScrollView, FlatList, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionic from "react-native-vector-icons/Ionicons"
import { collectionGroup, onSnapshot } from 'firebase/firestore'

const BottomTabView = () => {

  const [posts, setPosts] = useState([])
  
  const loadPosts = onSnapshot(collectionGroup(db, 'posts'), (snapshot) => {
    if (!snapshot.metadata.hasPendingWrites) {
      setPosts(snapshot.docs.map(doc => doc.data()))}
    },
    (error) => {}
    )

  useEffect(() => { 
    loadPosts
  }, [])
 

  const renderPost = ({item, index, separators}) => {
    return (
    <View style ={{ width: '33.33%', height: 120,}}>
    <Image
        source={{uri: item.imageURL}}
        style={{ height: '100%', resizeMode: 'cover', }}
    />
   </View>)
  }


  return (
    <View style={{
      width: '100%'
    }}>
      <FlatList
        numColumns={3}
        data={posts}
        renderItem= {renderPost}
        />
    </View>
  )
}

export default BottomTabView

const styles = StyleSheet.create({})