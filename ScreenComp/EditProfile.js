import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, TextInput, SafeAreaView, Dimensions} from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { auth, app, db } from '../Firebase';
import { useNavigation } from "@react-navigation/native"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


const EditProfile = ({route, navigation}) => {
  const {userDetails} = route.params;
  const {imageSource} = route.params;

  const navigationer = useNavigation()

  const [username, setUsername] = useState(userDetails.username)
  const [name, setName] = useState(userDetails.name)
  const [bio, setBio] = useState(userDetails.bio)
  const [profilePic, setPic] = useState('')
  const [saved, save] = useState(false)
  const [uploaded, setUploaded] = useState(null)

  const saveChanges = () => {
    if (imageSource != null) {
        setUploaded(false);
        saveStorage(imageSource, `profilePic/${auth.currentUser.uid}/${Math.random().toString(36)}`)
    }
    save(true)  
  }

  const saveSuccess = () => {
    Alert.alert(
        'Success',
        'Profile updated successfully'
    )
  }

  const saveStorage = async(image, path) => {
    const storage = getStorage()
    const storageRef = ref(storage, `profilePic/${auth.currentUser.uid}/${Math.random().toString(36)}`)
    const response = await fetch(image);
    const file = await response.blob();
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      console.log(error)
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setPic(downloadURL)
      });
      }
    );
  }

  useEffect(() => {
    if (saved == true) {
      const cuser = auth.currentUser?.uid
      const docRef = doc(db, 'users', cuser)
      setDoc(docRef, {
          name: name,
          username: username,
          bio: bio,
        },
      { merge: true })
      if (uploaded == null || uploaded == true) {
        navigation.goBack()
      }
      if (profilePic != '') {
        setUploaded(true)
        setDoc(docRef, {
            profilePic: profilePic
        },
        { merge: true })
      }
    }  
  })
 

  return (
    <SafeAreaView>
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
        }}>
            <View style ={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                padding: 10,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close-outline" style={{fontSize: 35}}/>
                </TouchableOpacity>
                <Text style={{fontSize:16, fontWeight:'bold',}}>Edit Profile</Text>
                <TouchableOpacity onPress={() => {
                    saveChanges();
                    saveSuccess();}}>
                    <Ionicons name="checkmark" style={{fontSize: 35, color:'#3493D9' }}/>
                </TouchableOpacity>
            </View>
            <View style={{padding: 20, alignItems: 'center'}}>
                <Image 
                    source={{uri: imageSource == null ? userDetails.profilePic : imageSource}}
                    style={{width: 80, height: 80, borderRadius: 100}}
                />
            <TouchableOpacity 
              onPress={() => 
                navigationer.push("EditProfilePic", {
                userDetails: userDetails
                })}>
                <Text style={{
                    color:"#3493D9",
                }}>
                    Change profile photo
                </Text>
            </TouchableOpacity>
            </View>
            <View style={{padding:10}}>
                <View>
                    <Text style={{opacity: 0.5,}}>Name</Text>
                    <TextInput 
                    placeholder="Name" 
                    defaultValue={userDetails.name}
                    onChangeText={text => setName(text)}
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
                    placeholder="Username" 
                    defaultValue={userDetails.username}
                    onChangeText={text => setUsername(text)}
                    style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderColor:'#CDCDCD',
                    }}
                    />
                </View>
                <View >
                    <Text style={{opacity: 0.5,}}>Bio</Text>
                    <TextInput 
                    placeholder="Bio"
                    defaultValue={userDetails.bio}
                    onChangeText={text => setBio(text)}
                    style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderColor:'#CDCDCD',
                    }}
                    />
                </View>
            </View>      
        </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({})