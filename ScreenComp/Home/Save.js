import React, {useState, useEffect} from "react"
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { db } from "../../Firebase"
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage"
import { auth } from "../../Firebase"
import { getDoc, doc, setDoc, collection, addDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import Feather from 'react-native-vector-icons/Feather';


function Save ({route}) {
    const [caption, setCaption] = useState("")
    const [user, setUser] = useState([])
    const [pressed, setPressed] = useState(false)

    const navigation = useNavigation()
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

    useEffect(() => {
        if(user.length == 0) {getUser()}
    }, [user])
   
    
    const SaveStorage = async(image, path) => {
        const storage = getStorage()
        const storageRef = ref(storage, path)   
        const response = await fetch(image);
        const file = await response.blob();

        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                const docData = {
                    caption: caption,
                    comments: [],
                    imageURL: downloadURL,
                    likes: 0,
                    profile_picture: user.profilePic,
                    user: user.username
                }
                const docRef = doc(db, 'users', auth.currentUser.uid);   
                const postRef = collection(docRef, 'posts') 
                console.log("uploading post")
                addDoc(postRef, docData)
                console.log("post uploaded")
                navigation.navigate("Main")}
            )}).catch((error)=> {
                console.log(error)
                const docData = {
                    caption: caption,
                    comments: [],
                    imageURL: "https://www.underseaproductions.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
                    likes: 0,
                    profile_picture: user.profilePic,
                    user: user.username
                }
                const docRef = doc(db, 'users', auth.currentUser.uid);   
                const postRef = collection(docRef, 'posts') 
                console.log("uploading post")
                addDoc(postRef, docData)
                console.log("post uploaded")
                navigation.navigate("Main")
            })
  
    }

    const createPost = (image) => {
        if (image == undefined) {
            console.log("Immage undefined")
            return
        } 
            console.log("uploading image")
            setPressed(true);
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
                <TouchableOpacity onPress={() => createPost(route.params.imageSource)} disabled={pressed}>
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