import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {LIGHT, THEME_COLOR2, THEME_COLOR2_SHADE_1} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  // import useNavigation Hook

  const navigation = useNavigation();

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
        <Image
          source={require('../assets//twitter_profile_picture.jpeg')}
          style={{height: 80, width: 80, borderRadius: 40}}
        />
        <Text>React native Dev</Text>
        <Text>Gurgaon, India</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: THEME_COLOR2,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        }}
        onPress={() => navigation.navigate('EditProfileScreen')}>
        <Text style={{color: LIGHT}}>Edit Profile</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
