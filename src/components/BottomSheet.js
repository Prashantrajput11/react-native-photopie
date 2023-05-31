import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import RBSheet from 'react-native-raw-bottom-sheet';
import {THEME_COLOR2_SHADE_1} from '../utils/Colors';

const BottomSheet = React.forwardRef((props, ref) => {
  return (
    <View style={styles.container}>
      <RBSheet
        ref={ref}
        animationType={props.animationType}
        height={props.height}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            // backgroundColor: THEME_COLOR2_SHADE_1,
            paddingHorizontal: 16,
            paddingVertical: 12,
            // borderTopRadius: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
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
