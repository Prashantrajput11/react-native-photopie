import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import Cta from '../components/Cta';
import {LIGHT, THEME_COLOR2} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  // Init local states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(true);
  const [badPassword, setBadPassword] = useState(false);

  const navigation = useNavigation();

  const validateUserLogin = () => {
    let valid = true;

    // validate for email
    if ((email = '')) {
      valid = false;
      setBadEmail(true);
    } else {
      setBadEmail(false);
    }

    // validate for passowrd

    if ((password = '')) {
      valid = false;
      setBadPassword(true);
    } else {
      setBadPassword(false);
    }

    return valid;
  };

  //  Handle user login
  const handleLogin = () => {
    // 1: check user exist or not
    // 2:if not then redirect to sign up page
  };

  return (
    <View style={styles.loginContainer}>
      <View>
        <CustomInput
          placeholder="enter email"
          icon={require('../assets/email.png')}
          onChangeText={text => setEmail(text)}
        />
        <CustomInput
          placeholder="enter password"
          icon={require('../assets/email.png')}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <View
        style={{
          marginHorizontal: 6,
          borderRadius: 6,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Cta ctaText={'Login'} bgColor={THEME_COLOR2} ctaTextColor={LIGHT} />
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
    justifyContent: 'center',
    // alignItems: 'center',
  },
  signupLinkContainer: {
    // backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
  },
  signupText: {
    color: 'red',
  },
});
