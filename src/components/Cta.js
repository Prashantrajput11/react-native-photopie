import {Pressable, StyleSheet, Text, Touchable, View} from 'react-native';
import React from 'react';
import {LIGHT} from '../utils/Colors';

const Cta = ({ctaText, currentIndex, onPress}) => {
  return (
    <View>
      <Pressable style={styles.ctaContainer} onPress={() => onPress()}>
        <Text style={styles.ctaText}>{ctaText}</Text>
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
    backgroundColor: LIGHT,
    paddingHorizontal: 6,
    paddingVertical: 10,
    width: 80,
    borderRadius: 8,
    // position: 'absolute',
    // bottom: 30,
    // marginHorizontal: 6,
  },

  ctaText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
