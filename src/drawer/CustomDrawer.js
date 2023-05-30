import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {DARK} from '../utils/Colors';
import {getActionFromState, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = () => {
  // import useNavigation Hook

  const navigation = useNavigation();
  let followers = 40;
  let following = 87;

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const renderName = async () => {
    try {
      const retrievedName = await AsyncStorage.getItem('NAME');
      const retrievedEmail = await AsyncStorage.getItem('EMAIL');

      setUserName(retrievedName);
      setUserEmail(retrievedEmail && retrievedEmail.split('@')[0]);
    } catch (error) {
      console.error(error);
    }
  };

  renderName();

  // Logout user
  const clearLocalData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('data removed');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{paddingVertical: 32, paddingHorizontal: 16}}>
      <Pressable>
        <Image
          source={require('../assets//twitter_profile_picture.jpeg')}
          style={{height: 40, width: 40, borderRadius: 20}}
        />
        <Text style={styles.textCommonStyles}>{userName}</Text>
        <Text>{userEmail}</Text>
      </Pressable>

      {/* pressable for followers screen */}

      <View style={{flexDirection: 'row', marginTop: 30}}>
        <Pressable style={{marginRight: 20, flexDirection: 'row'}}>
          <Text style={styles.textCommonStyles}>{`${following} `}</Text>
          <Text>{` following`}</Text>
        </Pressable>
        <Pressable style={{marginRight: 20, flexDirection: 'row'}}>
          <Text style={styles.textCommonStyles}>{`${followers} `}</Text>
          <Text>{` following`}</Text>
        </Pressable>
      </View>

      {/* Profile section */}

      <Pressable
        style={{flexDirection: 'row', marginTop: 32}}
        onPress={() => navigation.navigate('ProfileScreen')}>
        <Image
          source={require('../assets/user.png')}
          style={{height: 20, width: 20, marginRight: 20}}
        />
        <Text style={styles.textCommonStyles}>Profile</Text>
      </Pressable>

      <Pressable onPress={() => clearLocalData()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  textCommonStyles: {
    fontWeight: 'bold',
    color: DARK,
  },
});
