import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomInput from '../components/CustomInput';
import {THEME_COLOR4} from '../utils/Colors';

const SignupScreen = () => {
  return (
    <View>
      <CustomInput
        placeholder="enter name"
        icon={require('../assets/user.png')}
      />
      <CustomInput
        placeholder="enter email"
        icon={require('../assets/email.png')}
      />
      <CustomInput placeholder="enter phone " type={'number-pad'} />
      <CustomInput placeholder="enter passsword" isSecured={true} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: THEME_COLOR4,
  },
});
