import { StyleSheet, View, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import { doc, collection, onSnapshot } from "firebase/firestore";

const BottomTabView = () => {
  const [posts, setPosts] = useState([]);

  const docRef = doc(db, "users", auth.currentUser.uid);
  const postRef = collection(docRef, "posts");
  const loadPosts = onSnapshot(
    postRef,
    { includeMetadataChanges: true },
    (snapshot) => {
      if (!snapshot.metadata.hasPendingWrites) {
        const data = snapshot.docs.map((doc) => doc.data());
        console.log(data.length);
        if (data.length > posts.length) {
          console.log("loading");
          setPosts(data);
        }
      }
    },
    (error) => {}
  );

  useEffect(() => {
    loadPosts;
  }, []);

  const renderPost = ({ item, index, separators }) => {
    loadPosts;
    return (
      <View style={{ width: "33.33%", height: 120 }}>
        <Image
          source={{ uri: item.imageURL }}
          style={{ height: "100%", resizeMode: "cover" }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 0,
        marginTop: 40,
      }}
    >
      <FlatList numColumns={3} data={posts} renderItem={renderPost} />
    </View>
  );
};

export default BottomTabView;

const styles = StyleSheet.create({});
