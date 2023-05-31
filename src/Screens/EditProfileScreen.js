// React Native Imports
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';

// React Imports
import React, {useRef, useState, useEffect} from 'react';

// Custom Component Imports
import Loader from '../components/Loader';

// Utils Imports
import {
  DARK,
  GRAY,
  LIGHT,
  THEME_COLOR2,
  THEME_COLOR2_SHADE_1,
} from '../utils/Colors';
import {citiesList} from '../utils/Constants';

//  Hooks Imports
import {useNavigation} from '@react-navigation/native';

// Third Party Component/ Libraries Imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

// Firebase imports
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CustomDropdown from '../components/CustomDropdown';

const EditProfileScreen = ({route}) => {
  // Access the imageData from route.params
  const imageDataFinal = route.params?.imageData;
  const userBioFinal = route.params?.updatedBio;
  // create bottomsheet ref
  const refRBSheet = useRef();

  // Navigation Hook
  const navigation = useNavigation();

  // Init Local stattes
  const [imageData, setImageData] = useState({assets: [{uri: ''}]});
  const [showLoader, setShowLoader] = useState(false);
  const [userBio, setUserBio] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    setUserBio(userBioFinal);
  }, [userBioFinal]);

  useEffect(() => {
    setShowDropdown(false);
  }, [selectedCity]);

  //---------------------------------------------------//

  // Functions related to this screen  -Start//

  // Hanlde User's Camera Permission
  const handleCameraPermission = async type => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'please give permission',
          message: 'photopie needs access to yur camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      // if user grants permission, open the camera
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use camera');

        if (type == 0) {
          openCamera('photo');
        } else if (type == 1) {
          openGallery('photo');
        }
      } else {
        console.log('permission is denied by user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle opening the camera and selecting a photo
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log({result});
    if (!result.didCancel) {
      console.log({result});

      // setImageData(imageData && result.assets[0].uri);
      setImageData(result);
    }
  };

  // Function to handle opening the gallery and selecting a photo
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (!result.didCancel) {
      // setImageData(result.assets[0].uri);
      setImageData(result);
    }
  };

  // Update Profile
  const updateProfile = async () => {
    setShowLoader(true);

    try {
      console.log('asset', imageData.assets[0]);
      if (imageData.assets[0].uri) {
        console.log('asset inside if', imageData.assets[0]);
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri;
        await reference.putFile(pathToFile);
        const url = await storage()
          .ref(imageData.assets[0].fileName)
          .getDownloadURL();

        const USER_ID = await AsyncStorage.getItem('USER_ID');
        await firestore().collection('Users').doc(USER_ID).update({
          userImage: url,
          userBio: userBio,
        });
      } else {
        const USER_ID = await AsyncStorage.getItem('USER_ID');
        await firestore().collection('Users').doc(USER_ID).update({
          userBio: userBio,
          userLocation: selectedCity,
        });
      }

      setShowLoader(false);
      navigation.navigate('ProfileScreen');
    } catch (error) {
      setShowLoader(false);
      console.log('Error while updating', error);
    }
  };

  return (
    <View>
      {showLoader && <Loader isModalVisible={true} />}

      <Text style={{fontSize: 20, color: DARK, fontWeight: 'bold'}}>
        Edit Profile
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 16,
        }}>
        {imageData.assets[0].uri == '' ? (
          <Image
            source={{uri: imageDataFinal}}
            style={{height: 80, width: 80, borderRadius: 40}}
          />
        ) : (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={{height: 80, width: 80, borderRadius: 40}}
          />
        )}
        {(!imageData.assets[0].uri == '' || !userBio == '') && (
          <Pressable
            style={{
              backgroundColor: THEME_COLOR2,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
            }}
            onPress={() => {
              updateProfile();
            }}>
            <Text style={{color: LIGHT}}>Save</Text>
          </Pressable>
        )}
      </View>

      <Pressable
        onPress={() => refRBSheet.current.open()}
        style={{
          position: 'absolute',
          left: 60,
          top: 50,
        }}>
        <Image
          source={require('../assets/camera.png')}
          style={{height: 20, width: 20}}
        />
      </Pressable>

      {/* name feild */}
      <View style={styles.editFieldsContainer}>
        <Text style={styles.editFieldLabel}>Name</Text>
        <TextInput placeholder="Add your Name" />
      </View>
      {/* Field To Edit Bio  */}
      <View style={styles.editFieldsContainer}>
        <Text style={styles.editFieldLabel}>Bio</Text>
        <TextInput
          placeholder="Add your Bio"
          value={userBio}
          onChangeText={text => setUserBio(text)}
        />
      </View>
      {/* Field To edit Location */}

      <View style={styles.editFieldsContainer}>
        <Text style={styles.editFieldLabel}>Location</Text>
        <TextInput placeholder="Add your Location" value={selectedCity} />
        <Pressable onPress={() => setShowDropdown(!showDropdown)}>
          <Image
            source={require('../assets/down-arrow.png')}
            style={{height: 20, width: 20}}
          />
        </Pressable>
      </View>

      {/* list of cities */}

      {showDropdown && (
        <ScrollView style={{backgroundColor: '#fff', height: 300}}>
          {citiesList.map(city => {
            return (
              <View key={city.id}>
                <Pressable
                  style={{
                    borderTopColor: GRAY,
                    borderTopWidth: 1,
                    // marginVertical: 12,
                    paddingVertical: 12,
                    backgroundColor: THEME_COLOR2_SHADE_1,
                  }}
                  onPress={() => setSelectedCity(city.cityName)}>
                  <Text>{city.cityName}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      )}

      <RBSheet ref={refRBSheet} closeOnDragDown={true} closeOnPressMask={true}>
        <View>
          <Pressable onPress={() => handleCameraPermission(0)}>
            <Image
              source={require('../assets/camera.png')}
              style={{height: 20, width: 20, marginRight: 16}}
            />
            <Text>Camera</Text>
          </Pressable>
          <Pressable onPress={() => handleCameraPermission(1)}>
            <Image
              source={require('../assets/gallery.png')}
              style={{height: 20, width: 20, marginRight: 16}}
            />
            <Text>Gallery</Text>
          </Pressable>
        </View>
      </RBSheet>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  editFieldsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: GRAY,
    marginTop: 20,
    paddingLeft: 16,
  },

  editFieldLabel: {
    color: DARK,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 20,
  },
});
