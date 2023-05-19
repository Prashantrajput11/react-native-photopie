import {ActivityIndicator, StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import {THEME_COLOR2} from '../utils/Colors';

const Loader = ({isModaVisible}) => {
  return (
    <View>
      <Modal visible={isModaVisible} transparent>
        {/* parent view */}
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* child new */}
          <ActivityIndicator color={THEME_COLOR2} size="large" />
        </View>
      </Modal>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
