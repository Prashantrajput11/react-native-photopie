import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import RBSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = React.forwardRef((props, ref) => {
  return (
    <View style={styles.container}>
      <RBSheet
        ref={ref}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {props.children}
      </RBSheet>
    </View>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000',
});
