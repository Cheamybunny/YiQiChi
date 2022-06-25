import React, {useState, useLayoutEffect, useEffect} from "react"
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native"
import { db } from "../../Firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes} from "firebase/storage"
import { auth } from "../../Firebase"
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import Feather from 'react-native-vector-icons/Feather';


function Save ({route}) {
    const [caption, setCaption] = useState("")
    const [data, setData] = useState("")
    const [user, setUser] = useState([])
    const [uploaded, setUploaded] = useState(false)

    const navigation = useNavigation()
    useLayoutEffect(() => {
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
       
        if(data != "" && !uploaded) {
            const docData = {
                caption: caption,
                comments: [],
                imageURL: data,
                likes: 0,
                profile_picture: user.profilePic,
                user: user.username
            }   
            const postRef = doc(db, `users/${auth.currentUser.uid}/posts/${Math.random().toString(36)}`) 
            setDoc(postRef, docData, {merge: true})
            console.log(uploaded)
            setUploaded(true)
        }
        if(uploaded) {
            navigation.navigate("Main")
        }
        
        if(user.length == 0) {getUser()}
    }, [data, user, uploaded])
   
    
    const SaveStorage = async(image, path) => {
        const storage = getStorage()
        const storageRef = ref(storage, path)   
        const response = await fetch(image);
        const file = await response.blob();

        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                        setData(downloadURL)}
            )})
        // const uploadTask = uploadBytesResumable(storageRef, file);
   
    //     uploadTask.on('state_changed', 
    //     (snapshot) => {
    //       // Observe state change events such as progress, pause, and resume
    //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log('Upload is ' + progress + '% done');
    //       switch (snapshot.state) {
    //         case 'paused':
    //           console.log('Upload is paused');
    //           break;
    //         case 'running':
    //           console.log('Upload is running');
    //           break;
    //       }
    //     }, 
    //     (error) => {
    //       console.log(error)
    //     }, 
    //     () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setData(downloadURL)
    //       });
    //     }
    //   );
    }

    const createPost = (image) => {
        if (image == undefined) {
            return
        } 
            SaveStorage(image, `post/${auth.currentUser.uid}/${Math.random().toString(36)}`)
    }

    return (
        <View>  
            <Image source={{uri: route.params.imageSource}} style={{width: '100%', height: '60%',}}></Image>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Caption"
                    value={caption}
                    onChangeText={text => setCaption(text)}
                    style={styles.input}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => createPost(route.params.imageSource)}>
                   <Feather name='check' style={styles.upload}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '80%',
        alignSelf: 'center',
        paddingVertical: 10
      },
      input: {
        fontSize: 20,
        borderBottomWidth: 1,
        paddingTop: 20,
        borderColor:'#CDCDCD',
      },
      upload: {
        fontSize: 40,
        padding: 50,
        marginTop: 50,
        alignSelf: 'center'
      }
})

export default Save