import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomInput from '../components/CustomInput';
import {
  DARK,
  GRAY,
  LIGHT,
  THEME_COLOR2,
  THEME_COLOR2_SHADE_1,
} from '../utils/Colors';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

// Camera Imports

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Bottom sheet Imports
import RBSheet from 'react-native-raw-bottom-sheet';

const EditProfileScreen = () => {
  // create bottomsheet ref

  const refRBSheet = useRef();
  const navigation = useNavigation();

  const [imageData, setImageData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  // console.log(imageData.assets);

  // Hanlde User's Camera Permission
  const handleCameraPermission = async type => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'please give permission',
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
      } else {
        console.log('permission is denied by user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle opening the camera and selecting a photo
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log({result});
    if (!result.didCancel) {
      console.log({result});

      setImageData(result.assets[0].uri);
    }
  };

  // Function to handle opening the gallery and selecting a photo
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (!result.didCancel) {
      setImageData(result.assets[0].uri);
    }
  };

  // Update Profile

  const updateProfile = async () => {
    setShowLoader(true);
    try {
      // create a reference in the Firebase storage
      const reference = storage().ref(imageData);
      console.log({reference});
      // add the path to the file
      const pathToFile = imageData;

      // Use putFile to upload the file
      await reference.putFile(pathToFile);

      // Get the URL that needs to be saved in Firestore
      const url = await storage().ref(imageData).getDownloadURL();

      const USER_ID = await AsyncStorage.getItem('USER_ID');
      console.log(USER_ID);
      // Update the user document in Firestore with the URL
      await firestore().collection('Users').doc(USER_ID).update({
        userImage: url,
      });
      console.log('succesfuuly updated');

      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      console.log('Error while updating', error);
    }
  };

  return (
    <View>
      {showLoader && <Loader isModalVisible={true} />}

      <Text style={{fontSize: 20, color: DARK, fontWeight: 'bold'}}>
        Edit Profile
      </Text>
      <View style={{flexDirection: 'row'}}>
        {imageData == null ? (
          <Image
            source={require('../assets//twitter_profile_picture.jpeg')}
            style={{height: 80, width: 80, borderRadius: 40}}
          />
        ) : (
          <Image
            source={{uri: imageData}}
            style={{height: 80, width: 80, borderRadius: 40}}
          />
        )}

        <Pressable
          style={{
            backgroundColor: THEME_COLOR2,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
          }}
          onPress={() => {
            updateProfile();
            navigation.navigate('EditProfileScreen');
          }}>
          <Text style={{color: LIGHT}}>Save</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => refRBSheet.current.open()}
        style={{
          position: 'absolute',
          left: 60,
          top: 50,
        }}>
        <Image
          source={require('../assets/camera.png')}
          style={{height: 20, width: 20}}
        />
      </Pressable>

      {/* name feild */}
      <View style={styles.editFieldsContainer}>
        <Text style={styles.editFieldLabel}>Name</Text>
        <TextInput placeholder="Add your Name" />
      </View>
      {/* Field To Edit Bio  */}
      <View style={styles.editFieldsContainer}>
        <Text style={styles.editFieldLabel}>Bio</Text>
        <TextInput placeholder="Add your Bio" />
      </View>
      {/* Field To edit Location */}

      <View style={styles.editFieldsContainer}>
        <Text style={styles.editFieldLabel}>Location</Text>
        <TextInput placeholder="Add your Location" />
      </View>

      <RBSheet ref={refRBSheet} closeOnDragDown={true} closeOnPressMask={true}>
        <View>
          <Pressable onPress={() => handleCameraPermission(0)}>
            <Image
              source={require('../assets/camera.png')}
              style={{height: 20, width: 20, marginRight: 16}}
            />
            <Text>Camera</Text>
          </Pressable>
          <Pressable onPress={() => handleCameraPermission(1)}>
            <Image
              source={require('../assets/gallery.png')}
              style={{height: 20, width: 20, marginRight: 16}}
            />
            <Text>Gallery</Text>
          </Pressable>
        </View>
      </RBSheet>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  editFieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: GRAY,
    marginTop: 20,
    paddingLeft: 16,
  },

  editFieldLabel: {
    color: DARK,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 20,
  },
});
