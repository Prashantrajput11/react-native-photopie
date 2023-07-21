import {StyleSheet, Text, View, Image, Pressable, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GRAY, LIGHT, THEME_COLOR2, THEME_COLOR2_SHADE_1} from '../utils/Colors';
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
  const [updatedUserLocation, setUpdatedUserLocation] = useState('');
  const [following, setFollowing] = useState([]);
  const [followingCount, setFollowingCount] = useState('');
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
      setUpdatedUserLocation(updatedInfo.data().userLocation);
      setFollowingCount(updatedInfo.data().userFollowing.length);
      const followingUserIds = updatedInfo.data().userFollowing || [];

      const followingUsersData = [];
      for (const userId of followingUserIds) {
        const userSnapshot = await firestore()
          .collection('Users')
          .doc(userId)
          .get();

        const userData = userSnapshot.data();
        followingUsersData.push({
          name: userData.name,
          userImage: userData.userImage,
          userFollowers: userData.userFollowers.length, // Assuming userFollowers is an array
        });
      }

      setFollowing(followingUsersData);
    } catch (error) {
      console.log(error);
    }
  };

  // getUserUpdatedInfo();
  // Functions related to this screen  -End//

  return (
    <>
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
          <Text>{updatedUserLocation}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{marginRight: 12}}>{`following${followingCount}`}</Text>
            <Text>{`followers${followingCount}`}</Text>
          </View>
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

        <Pressable onPress={() => navigation.goBack()}>
          <Text>Go back</Text>
        </Pressable>
      </View>

      {/* // list */}

      <View>
        <Text>Friend list</Text>
        {following.map(user => (
          <View
            key={user.name}
            style={{
              borderColor: GRAY,
              borderWidth: 2,
              marginHorizontal: 16,
              marginVertical: 12,
              alignItems: 'center',
              paddingVertical: 12,
            }}>
            <Image
              source={{uri: user.userImage}}
              style={{height: 80, width: 80, borderRadius: 40}}
            />
            <Text>{user.name}</Text>
            <Text>Followers: {user.userFollowers}</Text>
            <Pressable
              style={{
                backgroundColor: THEME_COLOR2,
                paddingHorizontal: 12,
                width: 100,
                borderRadius: 6,
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>Chat</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
