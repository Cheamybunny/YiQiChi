import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { auth, db } from "../../Firebase";

function Save({ route }) {
  const [caption, setCaption] = useState("");
  const [data, setData] = useState("");
  const [user, setUser] = useState({});
  const [uploaded, setUploaded] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      setUser(docSnap.data());
    };

    getUser();
  }, [uploaded]);

  const SaveStorage = async (image, path) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    const response = await fetch(image);
    const file = await response.blob();

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        setUploaded(true);

        // Post data
        const docData = {
          caption: caption,
          comments: [],
          imageURL: downloadURL,
          likes: 0,
          profile_picture: user.profilePic,
          user: user.username,
        };

        const docRef = await addDoc(collection(db, "posts"), docData);

        // const postRef = doc(
        //   db,
        //   `users/${auth.currentUser.uid}/posts/${Math.random().toString(36)}`
        // );
        // setDoc(postRef, docData, { merge: true });
        // console.log(uploaded);

        navigation.navigate("Main");
      });
    });
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
  };

  const createPost = (image) => {
    if (image == undefined) {
      return;
    }

    setIsDisable(true);

    SaveStorage(
      image,
      `post/${auth.currentUser.uid}/${Math.random().toString(36)}`
    );
  };

  return (
    <View>
      <Image
        source={{ uri: route.params.imageSource }}
        style={{ width: "100%", height: "60%" }}
      ></Image>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Caption"
          value={caption}
          onChangeText={(text) => setCaption(text)}
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => createPost(route.params.imageSource)}  disabled={isDisable}>
          <Feather name="check" style={styles.upload} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    paddingVertical: 10,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingTop: 20,
    borderColor: "#CDCDCD",
  },
  upload: {
    fontSize: 40,
    padding: 50,
    marginTop: 50,
    alignSelf: "center",
  },
});

export default Save;
