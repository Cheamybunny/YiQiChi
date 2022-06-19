import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import images from '../../images'

const Header = () => {
    return (
   
        <View style={styles.container}>
            <TouchableOpacity>
                <Image 
                    style={styles.logo} 
                    source={images.headerLogo}
                />
            </TouchableOpacity>
        
            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <Image
                        style={styles.icon}
                        source={images.newPost}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.icon}
                        source={images.activity}
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