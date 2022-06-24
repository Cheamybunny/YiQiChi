import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import Save from './Save';


const NewPost = ({route}) => {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [image, setImage] = useState(null);
  const cameraRef = useRef()
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const takePicture = async () => {
    if (cameraRef.current) {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const data = await cameraRef.current.takePictureAsync(null);
        const source = data.uri;
        if (source != null) {
            navigation.push('Save', {imageSource:source})
        }
    }
};
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            navigation.push('Save', {imageSource: result.uri})
        }
    };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
      </Camera>
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>      
            <TouchableOpacity onPress={takePicture} style={styles.capturePicture}>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.chooseImage}>
                <Feather style={{width: '100%', height: '100%'}} name={"image"} size={40} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default NewPost
const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 0.1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 30,
      alignItems:'center'
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      color: 'black'
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    capturePicture: {
        borderWidth: 6,
        borderColor: 'gray',
        backgroundColor: "white",
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 120  
    },
    chooseImage: {
        align: 'flex-end'
    }
  });