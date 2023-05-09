import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {THEME_COLOR1, LIGHT, THEME_COLOR3} from '../utils/Colors';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 4000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={THEME_COLOR1}
        barStyle={'light-content'}
        // hidden={true}
        translucent={false}
        networkActivityIndicatorVisible={false}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/android/mipmap-hdpi/ic_launcher_round.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR1,
  },

  logoContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: THEME_COLOR3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: 200,
    width: 200,
  },
  logoText: {
    fontSize: 32,
    color: LIGHT,
  },
});
