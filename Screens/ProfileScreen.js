import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../Firebase";
import BottomTabView from "../ScreenComp/BottomTabView";
import { ProfileBody, ProfileButtons } from "../ScreenComp/ProfileBody";

const ProfileScreen = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const cuser = auth.currentUser?.uid;
    const docRef = doc(db, "users", cuser);
    onSnapshot(
      docRef,
      (docs) => {
        setUser(docs.data());
      },
      (error) => {}
    );
  }, [posts]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <ProfileBody
          name={user.name}
          accountName={user.username}
          profileImage={user.profilePic}
          followers={user.followers}
          following={user.following}
          post={user.post}
          bio={user.bio}
        />
        <ProfileButtons id={0} userDetails={user} />
        <BottomTabView />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
