import React, {useState, useLayoutEffect, useEffect} from "react"
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native"
import { db } from "../../Firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes} from "firebase/storage"
import { auth } from "../../Firebase"
import { getDoc, doc, addDoc, serverTimestamp, collection } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import Feather from 'react-native-vector-icons/Feather';


function Save ({route}) {
    const [caption, setCaption] = useState("")
    const [data, setData] = useState("")
    const [user, setUser] = useState([])
    const [uploaded, setUploaded] = useState(false)

    const navigation = useNavigation()
    useEffect(() => {
        if(user.length == 0) {
            getUser()
            return getUser
        }
        return () => {
            getDoc;
            getUser
        }
    }, [user])
   
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
    const SaveStorage = async(image, path) => {
        const storage = getStorage()
        const storageRef = ref(storage, path)   
        const response = await fetch(image);
        const file = await response.blob();

        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async(downloadURL) => {
                        const docData = {
                            caption: caption,
                            comments: [],
                            imageURL: downloadURL,
                            likes: 0,
                            profile_picture: user.profilePic,
                            user: user.username,
                          };
                          const postRef = doc(db, 'users', auth.currentUser.uid);
                          const colRef = collection(postRef, 'posts')
                          await addDoc(colRef, docData);

                          navigation.navigate("Main")
                    }
            )})
    }

    const createPost = (image) => {
        if (image == undefined) {
            return
        } 
            SaveStorage(image, `post/${auth.currentUser.uid}/${Math.random().toString(36)}`)
            setUploaded(true)
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
                <TouchableOpacity onPress={() => createPost(route.params.imageSource)} disabled={uploaded}>
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
