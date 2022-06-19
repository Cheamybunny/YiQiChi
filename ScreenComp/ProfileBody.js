import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native"

export const ProfileBody = ({
    name, 
    accountName,
    profileImage,
    post,
    followers,
    following,
}) => {
  return (
    <View>
      {accountName ? (
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: 10
      }}>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          paddingHorizontal: 20
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight:'600', 
          }}>
            {accountName}
          </Text>
          <Feather name="chevron-down" style={{
            fontSize: 20,
            color: 'black',
            paddingHorizontal: 5,
            opacity: 0.5,
          }}/>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Feather 
            name="plus-square" 
            style={{
              fontSize: 30,
              color:'black',
              paddingHorizontal: 15,
          }}/>
          <Feather
           name="menu"
           style={{
            fontSize: 30,
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
          <View style={{
              alignItems: 'center',
          }}>
            <Image 
              source={{uri: profileImage == null ? 'https://usuploads.s3.amazonaws.com/itlearn360/uploads/2018/12/dummy-profile-pic-300x300.jpg' : profileImage}} 
              style={{
                resizeMode: 'cover',
                width: 80,
                height: 80,
                borderRadius: 100,
               }}
            />
            <Text 
              style={{
                paddingVertical: 5,
                fontWeight: 'bold',
              }}>
              {name}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{post}</Text>
              <Text>Posts</Text>
          </View>
          <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{followers}</Text>
              <Text>Followers</Text>
          </View>
          <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{following}</Text>
              <Text>Following</Text>
          </View>
        </View>
    </View>
  )
}

export const ProfileButtons = ({id,name,accountName,profileImage}) => {
    const navigation = useNavigation()
    const [follow, setFollow] = useState(follow)
  return (
      <View>
      {id === 0 ? (
        <View style={{
          width:'100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingVertical:5
        }}>
        <TouchableOpacity 
        onPress={()=> 
          navigation.push('EditProfile',{
            name: name, 
            accountName: accountName,
            profileImage: profileImage,
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