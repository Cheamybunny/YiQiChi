import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image, TextInput} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const EditProfile = ({route, navigation}) => {
  const {name, accountName, profileImage} = route.params;
  const TostMessage = () =>{
    ToastAndroid.show("Edited Sucessfully!", ToastAndroid.SHORT);
  };
  return (
    <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    }}>
        <View style ={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            padding: 10
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close-outline" style={{fontSize: 35}}/>
            </TouchableOpacity>
            <Text style={{fontSize:16, fontWeight:'bold',}}>Edit Profile</Text>
            <TouchableOpacity onPress={() => {
                  TostMessage();
                navigation.goBack()}}>
                <Ionicons name="checkmark" style={{fontSize: 35, color:'#3493D9' }}/>
            </TouchableOpacity>
        </View>
        <View style={{padding: 20, alignItems: 'center'}}>
            <Image 
                source={profileImage}
                style={{width: 80, height: 80, borderRadius: 100}}
            />
            <Text style={{
                color:"#3493D9",
            }}>
                Change profile photo
            </Text>
        </View>
        <View style={{padding:10}}>
            <View>
                <Text style={{opacity: 0.5,}}>Name</Text>
                 <TextInput 
                   placeholder="name" 
                   defaultValue={name} 
                   style={{
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderColor:'#CDCDCD',
                 }}
                />
            </View>
            <View style={{paddingVertical: 10}}>
                <Text style={{opacity: 0.5,}}>Username</Text>
                 <TextInput 
                   placeholder="accountName" 
                   defaultValue={accountName} 
                   style={{
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderColor:'#CDCDCD',
                 }}
                />
            </View>
            <View style={{paddingVertical: 10}}>
                <Text style={{opacity: 0.5,}}>Bio</Text>
                 <TextInput 
                   placeholder="Bio" 
                   style={{
                    fontSize: 16,
                    borderBottomWidth: 1,
                    borderColor:'#CDCDCD',
                 }}
                />
            </View>
        </View>
        <View>
            <Text
              style={{
                marginVertical: 10,
                padding: 10,
                color: '#3493D9',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#EFEFEF',
              }}>
                Personal information settings
            </Text>
        </View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})