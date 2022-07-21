import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import images from '../../images'
import { auth } from '../../Firebase'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
const Header = () => {
    const navigation = useNavigation()

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          navigation.replace("YiQiChi Login")
        })
        .catch(error => alert(error.message))
    }
    return (
        
        <View style={styles.container}>
            <TouchableOpacity>
                <Image 
                    style={styles.logo} 
                    source={images.headerLogo}
                />
            </TouchableOpacity>
        
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
                    <Image
                        style={styles.icon}
                        source={images.newPost}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}>
                    <Image
                        style={styles.icon}
                        source={images.logout}
                    />
                </TouchableOpacity>
            </View>    
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 30,
    },

    logo: {
        width: 150,
        height: 60,
        resizeMode: 'contain',
    },

    iconsContainer: {
        flexDirection: 'row'
    },
    
    icon: {
        width: 30,
        height: 30,
        marginLeft: 20,
        resizeMode: 'contain',
    }
})

export default Header