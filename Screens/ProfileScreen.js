import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProfileBody, ProfileButtons } from '../ScreenComp/ProfileBody'
import BottomTabView from '../ScreenComp/BottomTabView';

const ProfileScreen = () => {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody
        name="Kim Min Jeong"
        accountName="aespa_winter"
        profileImage={require('../assets/unnamed.jpg')}
        followers="35"
        following="36"
        post="42"
      />
      <ProfileButtons 
      id={0} 
      name="Kim Min Jeong" 
      accountName="aespa_winter"
      profileImage={require('../assets/unnamed.jpg')}
      />
      </View>
      <BottomTabView/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})