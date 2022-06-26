import React, {useState, useLayoutEffect, useEffect} from "react"
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native"
import { db } from "../../Firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { auth } from "../../Firebase"
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'


function Save ({route}) {
    const [caption, setCaption] = useState("")
    const [data, setData] = useState("")
    const [user, setUser] = useState([])
    const [uploaded, setUploaded] = useState(false)

    const navigation = useNavigation()
    useEffect(() => {
        const getUser = async() => {
            if (auth.currentUser != null ) {
                
                const cuser = auth.currentUser?.uid
                const docRef = doc(db, 'users', cuser)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setUser(docSnap.data());
                    } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    }
            }
        }
        
        if (user.length == 0) {
            getUser()
        }

        if(uploaded) {
            const docData = {
                caption: caption,
                comments: [],
                imageURL: data,
                likes: 0,
                profile_picture: user.profilePic,
                user: user.username
            }   
            const postRef = doc(db, `users/${auth.currentUser.uid}/posts/`,`${Math.random().toString(36)}`) 
            setDoc(postRef, docData, {merge: true})
            if (uploaded) {   
                navigation.navigate("Main")
            }
        }
        
        
    })
   
    
    const SaveStorage = async(image, path) => {
        const storage = getStorage()
        const storageRef = ref(storage, path)
        const response = await fetch(image);
        const file = await response.blob();
        const uploadTask = uploadBytesResumable(storageRef, file);
   
        uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
            setData(downloadURL)
          });
        }
      );
    }

    const createPost = async(image) => {
        if (image == undefined) {
            return
        } 
        await SaveStorage(image, `post/${auth.currentUser.uid}/${Math.random().toString(36)}`).then(setUploaded(true))
    }

    return (
        <View>
            <Image source={{uri: route.params.imageSource}} style={{width: '100%', height: '70%',}}></Image>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Caption"
                    value={caption}
                    onChangeText={text => setCaption(text)}
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => createPost(route.params.imageSource)}>
                    <Text>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '60%'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
})

export default Save