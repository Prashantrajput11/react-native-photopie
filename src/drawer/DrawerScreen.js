import {Image, StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import React, {useState, useRef} from 'react';
import {THEME_COLOR2} from '../utils/Colors';
import Home from '../bottomTabs/Home';
import Connection from '../bottomTabs/Connection';
import Upload from '../bottomTabs/Upload';
import Notifications from '../bottomTabs/Notifications';
import Jobs from '../bottomTabs/Jobs';

import BottomSheet from '../components/BottomSheet';

import {UPLOAD_OPTIONS} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';

const DrawerScreen = () => {
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      {selectedTab == 0 && <Home />}
      {selectedTab == 1 && <Connection />}
      {selectedTab == 2 && <Upload />}
      {selectedTab == 3 && <Notifications />}
      {selectedTab == 4 && <Jobs />}

      {/* render bottom tabs  */}
      <View style={styles.bottomTabsContainer}>
        <View style={styles.tabs}>
          {/* Home Tab */}
          <Pressable style={styles.singleTab} onPress={() => setSelectedTab(0)}>
            <Image
              source={require('../assets/home.png')}
              style={{height: 20, width: 20}}
            />
            <Text>Home</Text>
          </Pressable>

          {/* Connection Tab */}
          <Pressable style={styles.singleTab} onPress={() => setSelectedTab(1)}>
            <Image
              source={require('../assets/team.png')}
              style={{height: 20, width: 20}}
            />
            <Text>Network</Text>
          </Pressable>

          {/* Upload Tab */}
          <Pressable
            style={styles.singleTab}
            onPress={() => {
              setSelectedTab(2);
            }}>
            <Image
              source={require('../assets/plus.png')}
              style={{height: 20, width: 20}}
            />
            <Text>Post</Text>
          </Pressable>

          {/* Notifications tab */}
          <Pressable
            style={styles.singleTab}
            onPress={() => {
              setSelectedTab(3);
            }}>
            <Image
              source={require('../assets/bell.png')}
              style={{height: 20, width: 20}}
            />
            <Text>Notifications</Text>
          </Pressable>

          {/* Jobs Tab */}
          <Pressable style={styles.singleTab} onPress={() => setSelectedTab(4)}>
            <Image
              source={require('../assets/briefcase.png')}
              style={{height: 20, width: 20}}
            />
            <Text>Job</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  bottomTabsContainer: {
    flex: 1,
    backgroundColor: 'orange',
  },
  tabs: {
    backgroundColor: '#fff',
    height: 120,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: '#000',
    borderTopWidth: 1,
  },
  singleTab: {
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadOptionsContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

  uploadOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});
