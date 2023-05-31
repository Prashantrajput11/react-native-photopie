import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LIGHT, THEME_COLOR2, THEME_COLOR2_SHADE_1} from '../utils/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// Third Party Component/ Libraries Imports
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase imports
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  // import useNavigation Hook

  const navigation = useNavigation();

  const [userBio, setUserBio] = useState('');
  const [updatedProfileImage, setUpdatedProfileImage] = useState('');
  const isFocused = useIsFocused();

  // Functions related to this screen  -Start//

  useEffect(() => {
    getUserUpdatedInfo();
  }, [isFocused]);
  const getUserUpdatedInfo = async () => {
    try {
      const USER_ID = await AsyncStorage.getItem('USER_ID');

      const updatedInfo = await firestore()
        .collection('Users')
        .doc(USER_ID)
        .get();

      setUserBio(updatedInfo.data().userBio);
      setUpdatedProfileImage(updatedInfo.data().userImage);
    } catch (error) {
      console.log(error);
    }
  };

  getUserUpdatedInfo();
  // Functions related to this screen  -End//

  return (
    <View
      style={{
        // marginHorizontal: 16,
        // marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: THEME_COLOR2_SHADE_1,
        paddingHorizontal: 16,
        paddingVertical: 32,
      }}>
      <View>
        {updatedProfileImage == '' ? (
          <Image
            source={require('../assets/user.png')}
            style={{height: 80, width: 80, borderRadius: 40}}
          />
        ) : (
          <Image
            source={{uri: updatedProfileImage}}
            style={{height: 80, width: 80, borderRadius: 40}}
          />
        )}

        <Text>{userBio}</Text>
        <Text>Gurgaon, India</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: THEME_COLOR2,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        }}
        onPress={() =>
          navigation.navigate('EditProfileScreen', {
            imageData: updatedProfileImage,
            updatedBio: userBio,
          })
        }>
        <Text style={{color: LIGHT}}>Edit Profile</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
