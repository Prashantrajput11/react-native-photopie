import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import Cta from '../components/Cta';
import {LIGHT, THEME_COLOR2} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  // Init local states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);

  const navigation = useNavigation();

  const validateUserLogin = () => {
    let valid = true;

    // validate for email
    if (email == '') {
      valid = false;
      setBadEmail(true);
    } else {
      setBadEmail(false);
    }

    // validate for passowrd

    if (password == '') {
      valid = false;
      setBadPassword(true);
    } else {
      setBadPassword(false);
    }

    return valid;
  };

  //  Handle user login
  const handleLogin = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .where('email', '==', email)
        .get();

      // Check if querySnapshot length is not 0, if true, means user with email id exists

      if (querySnapshot.docs.length === 0) {
        Alert.alert('no account exists');
      } else {
        if (querySnapshot.docs[0].data().password == password) {
          goToNextScreen(querySnapshot.docs[0].data());
        } else {
          Alert.alert('wrong password');
        }
      }
    } catch (error) {
      console.log('error in login query', error);
    }
    // 2:if not then redirect to sign up page
  };

  // Next

  const goToNextScreen = async data => {
    await AsyncStorage.setItem('NAME', data.name);
    await AsyncStorage.setItem('EMAIL', data.email);
    await AsyncStorage.setItem('PHONE', data.phone);
    await AsyncStorage.setItem('USER_ID', data.userId);
    await AsyncStorage.setItem('IS_USER_LOGGED_IN', 'yes');

    navigation.navigate('Main');
  };

  return (
    <View style={styles.loginContainer}>
      <View style={{height: 300}}>
        <Image
          source={require('../assets/photopie_login.png')}
          style={{
            height: '100%',
            width: '100%',
            // marginTop: 60,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View>
        <CustomInput
          placeholder="enter email"
          icon={require('../assets/photopie_email.png')}
          iconHeight={30}
          iconWidth={30}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {badEmail && <Text style={{color: 'red'}}>Please enter email</Text>}

        <CustomInput
          placeholder="enter password"
          icon={require('../assets/photopie_password.png')}
          iconHeight={30}
          iconWidth={30}
          password={password}
          onChangeText={text => setPassword(text)}
        />
        {badPassword && (
          <Text style={{color: 'red'}}>Please enter password</Text>
        )}
      </View>

      {/* Login Cta */}
      <View style={{marginHorizontal: 16, marginVertical: 32}}>
        <Pressable
          style={{
            backgroundColor: THEME_COLOR2,
            paddingHorizontal: 18,
            // marginHorizontal: 16,
            // marginVertical: 32,
            paddingVertical: 8,
            width: '100%',
            borderRadius: 6,
          }}
          onPress={() => {
            if (validateUserLogin()) {
              handleLogin();
            }
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </Pressable>
      </View>

      <View style={styles.signupLinkContainer}>
        <Text>Dont have an account? </Text>
        <Pressable onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signupText}>Signup</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // backgroundColor: 'orange',
  },
  signupLinkContainer: {
    // backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
  },
  signupText: {
    color: THEME_COLOR2,
    fontWeight: '700',
  },
});
