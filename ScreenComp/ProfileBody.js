import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native"
import images from '../images'
import NewPost from './Home/NewPost'


export const ProfileBody = ({
    name, 
    accountName,
    profileImage,
    post,
    followers,
    following,
    bio,
}) => {
  const navigation = useNavigation()
  return (
    <View>
      {accountName ? (
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      }}>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          paddingHorizontal: 10,
        }}>
          <Text style={{
            fontSize: 25,
            fontWeight:'600',
          }}>
            {accountName}
          </Text>
        </View>
<<<<<<< HEAD
        <View style={{flexDirection: 'row', alignItems:'center', marginHorizontal: 30}}>
          <TouchableOpacity>
=======
        <View style={{flexDirection: 'row', alignItems:'center', marginHorizontal: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate(NewPost)}>
>>>>>>> 3a420abae0367f9e112b543e857645075e711610
            <Feather 
            name="plus-square" 
            style={{
              fontSize: 30,
              color:'black',
              paddingHorizontal: 5,
            }}/>
          </TouchableOpacity>
          <Feather
           name="menu"
           style={{
            fontSize: 30,
            paddingHorizontal: 10,
           }}
          />
        </View>
      </View> 
      ) : null}
        <View style ={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingVertical: 20,
        }}>
          <View>
            <Image 
              source={{uri: profileImage}} 
              style={{
                resizeMode: 'cover',
                width: 80,
                height: 80,
                borderRadius: 100,
                alignSelf: 'center',
               }}
            />
            <Text 
              style={{
                paddingTop: 7,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {name}
            </Text>
            <Text 
              style={{
                paddingVertical: 5,
                textAlign: 'left',
              }}>
              {bio}
            </Text>
          </View>
          <View style={{alignItems: 'center', paddingBottom: 40,}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{post}</Text>
              <Text>Posts</Text>
          </View>
          <View style={{alignItems: 'center', paddingBottom: 40,}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{followers}</Text>
              <Text>Followers</Text>
          </View>
          <View style={{alignItems: 'center', paddingBottom: 40, paddingRight: 5}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{following}</Text>
              <Text>Following</Text>
          </View>
        </View>
    </View>
  )
}

export const ProfileButtons = ({id,userDetails}) => {
    const navigation = useNavigation()
    const [follow, setFollow] = useState(follow)
  return (
      <View>
      {id === 0 ? (
        <View style={{
          width:'95%',
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-evenly',
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity 
        onPress={()=> 
          
          navigation.push('EditProfile',{
            userDetails: userDetails,
            imageSource: null
          })
        }
        style={{
          width: '100%',
        }}>
          <View style={{
            width:'100%',
            height: 35,
            borderRadius:5,
            borderColor:"DEDEDE",
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: 1,
              opacity:0.8,
            }}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        </View>
      ) : (
            <View 
              style={{
                width:'100%',
                flexDirection:'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <TouchableOpacity 
                onPress={() => setFollow(!follow)} 
                style={{width: '42%'}}>
                <View style={{
                  width:'100%',
                  height:35,
                  borderRadius:5,
                  backgroundColor:follow ? null : "#3493D9",
                  borderWidth:follow? 1 : 0,
                  borderColor:"#DEDEDE",
                  justifyContent:'center',
                  alignItems: 'center',
                }}>
                  <Text style={{color:follow ? "black":"white"}}>
                    {follow ? 'Following': 'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>
              <View 
                style={{
                  width: '42%',
                  height: 35,
                  borderColor: '#DEDEDE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text>Message</Text>
              </View>
            </View>
          )
      }
      </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
    resizeMode: 'contain',
  }
})