import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {THEME_COLOR2} from '../utils/Colors';

const CustomHeader = ({onIconPress}) => {
  return (
    <View
      style={{
        backgroundColor: THEME_COLOR2,
        height: 60,
        width: '100%',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Pressable onPress={() => onIconPress()}>
        <Image
          source={require('../assets//twitter_profile_picture.jpeg')}
          style={{height: 40, width: 40, borderRadius: 20}}
        />
      </Pressable>

      <Text>PhotoPie</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
