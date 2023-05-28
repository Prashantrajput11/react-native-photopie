// React imports
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

// Colors
import {THEME_COLOR2, THEME_COLOR1, LIGHT, THEME_COLOR3} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  // useEffect Hook
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('WelcomeScreen');
      // navigation.navigate('Main');
      navigation.navigate('SignupScreen');
      // isUserNew();
    }, 4000);
  }, []);

  // const isUserNew = async () => {
  //   const isNewUser = AsyncStorage.getItem('IS_NEW_USER');

  //   if (isNewUser !== null) {
  //     navigation.navigate('WelcomeScreen');
  //   } else {
  //     navigation.navigate('WelcomeScreen');
  //   }
  //   console.log(isNewUser);
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={THEME_COLOR2}
        barStyle={'light-content'}
        // hidden={true}
        translucent={false}
        networkActivityIndicatorVisible={false}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/android/mipmap-xxxhdpi/ic_launcher_round.png')}
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
    backgroundColor: THEME_COLOR2,
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
