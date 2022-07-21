import { StyleSheet, View , ScrollView, FlatList, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Ionic from "react-native-vector-icons/Ionicons"
import { collectionGroup, onSnapshot } from 'firebase/firestore'

const BottomTabView = () => {

  const Tab = createMaterialTopTabNavigator();

  const [posts, setPosts] = useState([])
  
  const loadPosts = onSnapshot(collectionGroup(db, 'posts'), (snapshot) => {
    setPosts(snapshot.docs.map(doc => doc.data()))},
    (error) => {}
    )

  useEffect(() => { 
    loadPosts
  }, [])

  let squares = [];
  let numberOfSquare = 9;

  for (let index = 0; index < numberOfSquare; index++){
    squares.push(
      <View key={index}>
        <View style={{
          width: 119,
          height: 119,
          marginVertical:0.7,
          backgroundColor:'black',
          opacity:0.1
        }}>
        </View>
      </View>
    )
  }

  const Posts = () => {
    return(
      <View style={{
        width: '100%'
      }}>
        <FlatList
          numColumns={3}
          data={posts}
          renderItem={({item, index, separators }) => (
            <View style ={{ width: '33.33%', height: 120,}}>
            <Image
                source={{uri: item.imageURL}}
                style={{ height: '100%', resizeMode: 'cover', }}
            />
           </View>
        )}/>
      </View>
    )
  }

  const Video = () => {
    return(
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: '100%',
        height: '100%',
      }}>
        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingVertical: 5,
          justifyContent: 'space-between',
        }}>
          {squares}
        </View>
      </ScrollView>
    )
  }

  const Tags = () => {
    return(
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: '100%',
        height: '100%',
      }}>
        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingVertical: 5,
          justifyContent: 'space-between',
        }}>
          {squares}
        </View>
      </ScrollView>
    )
  }

  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarShowLabel: false,
      tabBarIndicatorStyle: {
        backgroundColor: 'black',
        height: 1.5
      },
      tabBarIcon: ({focused, color}) => {
        let iconName;
        if(route.name === "Posts") {
          iconName = focused ? "ios-apps-sharp" :"ios-apps-sharp";
          color = focused ? "black" : "grey"
        } else if(route.name === "Video") {
          iconName = focused ? "ios-play" :"ios-play-outline";
          color = focused ? "black" : "grey"
        } else if(route.name === "Tags") {
          iconName = focused ? "ios-pricetag" :"ios-pricetag-outline";
          color = focused ? "black" : "grey"
        }  

        return <Ionic name={iconName} color={color} size={22}/>;
      }
    })}>
      <Tab.Screen name="Posts" component={Posts}/>
      <Tab.Screen name="Video" component={Video}/>
      <Tab.Screen name="Tags" component={Tags}/>
    </Tab.Navigator>
  )
}

export default BottomTabView

const styles = StyleSheet.create({})