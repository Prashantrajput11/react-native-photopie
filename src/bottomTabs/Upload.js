import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Pressable,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';

import uuid from 'react-native-uuid';

// firebase storage
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheet from '../components/BottomSheet';
import Loader from '../components/Loader';
// Constant imports
import {UPLOAD_OPTIONS} from '../utils/Constants';
import {GRAY, THEME_COLOR2, THEME_COLOR2_SHADE_1} from '../utils/Colors';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Upload = () => {
  // useNavigation hokk

  const navigation = useNavigation();
  // Init local states
  const [imageData, setImageData] = useState({assets: [{uri: ''}]});
  const [caption, setCaption] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  // Create ref for bottomsheet
  const refRBSheet = useRef();

  // Open the bottom sheet when the component mounts
  useEffect(() => {
    refRBSheet.current.open();
  }, []);

  // Handle user's permission
  const requestCameraPermission = async type => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'please give permissio',
          message: 'photopie needs access to yur camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      // if user grants permission, open the camera
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use camera');

        if (type == 0) {
          openCamera('photo');
        } else if (type == 1) {
          openGallery('photo');
        }
        if (type == 2) {
          openCamera('video');
        } else if (type == 3) {
          openGallery('video');
        }
      } else {
        console.log('permission is denied by user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Open Camera
  const openCamera = async type => {
    // response contains data about the media such as uri,file typem height and width
    const result = await launchCamera({mediaType: type});
    if (!result.didCancel && type == 'photo') {
      console.log('response', result);
      setImageData(result);
    }

    if (!result.didCancel && type == 'video') {
      console.log('vid recorded');
    }
  };

  // Handle Choose from gallery
  const openGallery = async type => {
    // response contains data about the media such as uri,file typem height and width
    const response = await launchImageLibrary({mediaType: type});
    if (!response.didCancel) {
      console.log(response);
      setImageData(response);
    }
  };

  // Handle Upload Image
  const uploadImage = async () => {
    setShowLoader(true);
    let currentdate = new Date();
    let datetime =
      'Last Sync: ' +
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds();

    // Generate unique id for the post
    const postId = uuid.v4();

    // create a reference in the firebase storgae
    const reference = storage().ref(imageData.assets[0].fileName);

    // add the path file
    const pathToFile = imageData.assets[0].uri;

    // Use putfile
    await reference.putFile(pathToFile);

    // Get the url that needs to be saved in firestore
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();

    console.log({url});

    firestore()
      .collection('posts')
      .doc(postId)
      .set({
        postImage: url,
        createdAt: datetime,
        postId: postId,
        caption: caption,
      })
      .then(res => {
        console.log('Post uploaded');

        setShowLoader(false);
        setCaption('');
        // navigation.navigate('Home');
      })
      .catch(error => console.log(error));
  };

  // return
  return (
    <View>
      {showLoader && <Loader isModalVisible={true} />}
      <View style={styles.postContainer}>
        <TextInput
          placeholder="What's on your mind?"
          style={styles.captionContainer}
          value={caption}
          onChangeText={text => setCaption(text)}
        />

        {/* show image */}
        {imageData.assets[0].uri == '' ? null : (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 5,
              marginVertical: 16,
            }}
          />
        )}
        {caption == '' ? (
          <Pressable
            style={styles.postCtaDisabled}
            disabled={true}
            onPress={() => {
              if (imageData.assets[0].uri != '') {
                uploadImage();
              }
            }}>
            <Text style={{color: '#fff'}}>POST</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.postCta}
            onPress={() => {
              if (imageData.assets[0].uri != '') {
                uploadImage();
              }
            }}>
            <Text style={{color: '#fff'}}>POST</Text>
          </Pressable>
        )}
      </View>

      <BottomSheet ref={refRBSheet} animationType="slide" height={200}>
        <Pressable
          style={styles.uploadOptions}
          onPress={() => {
            requestCameraPermission(0);
          }}>
          <Image
            source={require('../assets/camera.png')}
            style={{height: 20, width: 20, marginRight: 16}}
          />
          <Text>Camera</Text>
        </Pressable>
        <Pressable
          style={styles.uploadOptions}
          onPress={() => {
            requestCameraPermission(1);
          }}>
          <Image
            source={require('../assets/gallery.png')}
            style={{height: 20, width: 20, marginRight: 16}}
          />
          <Text>Choose From Gallery</Text>
        </Pressable>

        <Pressable
          style={styles.uploadOptions}
          onPress={() => {
            requestCameraPermission(2);
          }}>
          <Image
            source={require('../assets/video-player.png')}
            style={{height: 20, width: 20, marginRight: 16}}
          />
          <Text>Record Video</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  uploadOptionsContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

  uploadOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  postContainer: {
    borderColor: GRAY,
    borderWidth: 2,
    borderRadius: 6,
    marginHorizontal: 16,
    // height: '50%',
    paddingBottom: 12,
    marginTop: 16,
    // backgroundColor: 'orange',
  },
  postCta: {
    backgroundColor: THEME_COLOR2,
    // width: 100,
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-end',
    marginHorizontal: 16,
    marginTop: 16,
    color: '#fff',
  },
  postCtaDisabled: {
    backgroundColor: GRAY,
    // width: 100,
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-end',
    marginHorizontal: 16,
    marginTop: 16,
    color: '#fff',
  },
  captionContainer: {
    marginTop: 20,
    borderColor: THEME_COLOR2_SHADE_1,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 12,
    paddingVertical: 16,
  },
});
