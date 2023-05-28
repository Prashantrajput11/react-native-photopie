import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import React from 'react';
import {THEME_COLOR2} from '../utils/Colors';

const CustomInput = ({
  placeholder,
  type,
  icon,
  isSecured,
  onChangeText,
  iconHeight,
  iconWidth,
}) => {
  return (
    <View style={styles.container}>
      {icon && (
        <Image source={icon} style={{height: iconHeight, width: iconWidth}} />
      )}
      <TextInput
        placeholder={placeholder}
        keyboardType={type}
        secureTextEntry={isSecured}
        onChangeText={onChangeText}
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
