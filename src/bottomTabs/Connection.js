import {StyleSheet, Text, View, FlatList, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {DARK, GRAY, THEME_COLOR2} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connection = () => {
  const [users, setUsers] = useState([]);
  let userIdFromLocal = '';
  // get id from local storage

  const getUserIdFromLocal = async () => {
    let userId = await AsyncStorage.getItem('USER_ID');
    return userId;

    // console.log('from local', userId);

    // 183d6d31-3844-496b-89a5-042a249dfbb2

    // from fire base 183d6d31-3844-496b-89a5-042a249dfbb2
  };

  getUserIdFromLocal();

  useEffect(() => {
    getUsersToFollow();
  }, []);
  const getUsersToFollow = async () => {
    try {
      let querySnapShot = await firestore().collection('Users').get();
      let fetchedUsers = querySnapShot.docs.map(doc => doc.data());

      console.log({fetchedUsers});
      userIdFromLocal = await getUserIdFromLocal();

      console.log({userIdFromLocal});
      let filteredUsers = fetchedUsers.filter(user => {
        // check if user;s id === user id from local storages
        return user.userId !== userIdFromLocal;
      });
      console.log({filteredUsers});
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const addFollower = async followedUserId => {
    // get user id from local storage
    userIdFromLocal = await getUserIdFromLocal();

    try {
      // access the user doc from firestore
      let followedUserSnapshot = await firestore()
        .collection('Users')
        .doc(followedUserId)
        .get();

      let followerList = followedUserSnapshot.data().userFollowers || [];
      followerList.push(userIdFromLocal);
      // Update the follower list of the person being followed
      await firestore()
        .collection('Users')
        .doc(followedUserId)
        .update({userFollowers: followerList});
      console.log('successfully followerd');
    } catch (error) {
      console.log(error);
    }
  };

  const updateFollowingList = async followingId => {
    // get user id from local storage
    userIdFromLocal = await getUserIdFromLocal();

    try {
      let followingSnapshot = await firestore()
        .collection('Users')
        .doc(userIdFromLocal)
        .get();

      let followingList = followingSnapshot.data().userFollowing;
      console.log({followingList});
      followingList.push(followingId);

      // Update the following list of the person
      await firestore()
        .collection('Users')
        .doc(userIdFromLocal)
        .update({userFollowing: followingList});
      console.log('successfully updated following list');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        // numColumns={2}
        // keyExtractor={item => item.userId}
        renderItem={({item}) => {
          return (
            <View
              style={{
                // backgroundColor: 'orange',
                borderWidth: 2,
                borderColor: GRAY,
                height: 200,
                marginVertical: 10,
                marginHorizontal: 32,
                alignItems: 'center',
                borderRadius: 6,
                // width: 100,
                paddingHorizontal: 22,
                shadowColor: GRAY,
                shadowOpacity: 0.8,
                shadowOffset: {width: 1, height: 1},
                shadowRadius: 2,
                elevation: 1, // Only for Android
              }}>
              <Text
                style={{
                  color: DARK,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 6,
                }}>
                {item.name}
              </Text>
              {!item.userImage ? (
                <Image
                  source={require('../assets/user.png')}
                  style={{height: 100, width: 100}}
                />
              ) : (
                <Image
                  source={{uri: item.userImage}}
                  style={{height: 100, width: 100}}
                />
              )}
              <Pressable
                onPress={() => {
                  addFollower(item.userId);
                  updateFollowingList(item.userId);
                }}
                style={{
                  backgroundColor: THEME_COLOR2,
                  paddingHorizontal: 12,
                  marginTop: 6,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}>
                <Text style={{color: '#fff'}}>Follow</Text>
              </Pressable>

              <Text>{`${item.userFollowers.length} followers`} </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Connection;

const styles = StyleSheet.create({});
