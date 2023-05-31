import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Screens/SplashScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import Main from '../Screens/Main';
import Upload from '../bottomTabs/Upload';
import Home from '../bottomTabs/Home';
import ProfileScreen from '../Screens/ProfileScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';
import CreateJob from '../bottomTabs/CreateJob';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
          options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen
          name={'WelcomeScreen'}
          component={WelcomeScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name={'LoginScreen'}
          component={LoginScreen}
          options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen
          name={'ProfileScreen'}
          component={ProfileScreen}
          options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen
          name={'EditProfileScreen'}
          component={EditProfileScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name={'CreateJob'}
          component={CreateJob}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name={'SignupScreen'}
          component={SignupScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name={'Main'}
          component={Main}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
