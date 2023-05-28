import {Pressable, StyleSheet, Text, Touchable, View} from 'react-native';
import React from 'react';
import {LIGHT} from '../utils/Colors';

const Cta = ({
  ctaText,
  currentIndex,
  onPress,
  bgColor,
  ctaTextColor,
  ctaWidth,
}) => {
  console.log({ctaWidth, bgColor, ctaText});
  return (
    <View style={{backgroundColor: bgColor}}>
      <Pressable
        style={[styles.ctaContainer, {width: ctaWidth}]}
        onPress={() => onPress()}>
        <Text style={[styles.ctaText, {color: ctaTextColor}]}>{ctaText}</Text>
      </Pressable>
    </View>
  );
};

export default Cta;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ctaContainer: {
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 10,
    // width: 80,
    borderRadius: 8,
    // position: 'absolute',
    // bottom: 30,
    marginHorizontal: 16,
  },

  ctaText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
