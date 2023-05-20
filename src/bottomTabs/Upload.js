import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import React, {useRef} from 'react';

// firebase storage
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheet from '../components/BottomSheet';

// Constant imports
import {UPLOAD_OPTIONS} from '../utils/Constants';

const Upload = () => {
  const refRBSheet = useRef();
  // Handle user's permission
  const requestCameraPermission = async () => {
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

        // if user has granted permission, open the camera
        openCamera();

        // create  a reference
        const reference = storage().ref('black-t-shirt-sm.png');
        const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;

        // uploads file
        await reference.putFile(pathToFile);
      } else {
        console.log('permission is denied by user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Open Camera
  const openCamera = async () => {
    // response contains data about the media such as uri,file typem height and width
    const response = await launchCamera({mediaType: 'photo'});
    if (!response.didCancel) {
      console.log(response);
    }
  };

  // return
  return (
    <View>
      <BottomSheet ref={refRBSheet} animationType="slide" height={200}>
        <FlatList
          data={UPLOAD_OPTIONS}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Pressable style={styles.uploadOptions}>
              <Image
                source={item.image}
                style={{height: 20, width: 20, marginRight: 16}}
              />
              <Text>{item.text}</Text>
            </Pressable>
          )}
        />
      </BottomSheet>
      <Pressable onPress={() => refRBSheet.current.open()}>
        <Text>Camera</Text>
      </Pressable>
      <Text>Upload</Text>
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
});