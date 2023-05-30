import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerScreen from '../drawer/DrawerScreen';
import CustomDrawer from '../drawer/CustomDrawer';

const Drawer = createDrawerNavigator();

function Main() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="DrawerScreen"
        component={DrawerScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default Main;

const styles = StyleSheet.create({});
