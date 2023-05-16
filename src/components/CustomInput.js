import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import React from 'react';
import {THEME_COLOR2} from '../utils/Colors';

const CustomInput = ({placeholder, type, icon, isSecured}) => {
  return (
    <View style={styles.container}>
      {icon && <Image source={icon} style={{height: 20, width: 20}} />}
      <TextInput
        placeholder={placeholder}
        keyboardType={type}
        secureTextEntry={isSecured}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: THEME_COLOR2,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 6,
    paddingHorizontal: 4,
  },
});
