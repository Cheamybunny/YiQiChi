import { collectionGroup, getDocs, orderBy, query, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { db } from "../Firebase";
import Header from "../ScreenComp/Home/Header";
import Post from "../ScreenComp/Home/Post";
const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    setRefreshing(true);
    const postQuery = query(
      collectionGroup(db, "posts"),
      orderBy("created", "desc")
    );
    const querySnapshot = await getDocs(postQuery);
    setPosts(querySnapshot.docs.map((doc) => doc.data()));
    setRefreshing(false);
  }; 

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Header navigation />
      <FlatList
        data={posts}
        renderItem={({ item: post }) => <Post post={post} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadPosts} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
