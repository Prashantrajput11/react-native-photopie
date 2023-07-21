import {StyleSheet, Text, View, Alert, Pressable} from 'react-native';
import uuid from 'react-native-uuid';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import {
  THEME_COLOR2,
  THEME_COLOR2_SHADE_1,
  THEME_COLOR4,
} from '../utils/Colors';
import Cta from '../components/Cta';

// Firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/Loader';

const SignupScreen = () => {
  // navigation hook

  const navigation = useNavigation();
  // Init local states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Init local states
  const [badName, setBadName] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badPhone, setBadPhone] = useState(false);
  const [badPassword, setBadPassword] = useState(false);

  // validate user data

  const validateData = () => {
    // Name validation
    if (!name || name.length < 4) {
      setBadName(true);
      return false;
    }

    // Email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email || !emailRegex.test(email)) {
      setBadEmail(true);
      return false;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/; // Change this if the format is different in your country
    if (!phone) {
      setBadPhone(true);
      return false;
    }

    // Password validation
    if (!password || password.length < 6) {
      setBadPassword(true);
      return false;
    }

    // If all validations pass, return true
    return true;
  };

  // create new user
  const createNewUser = async () => {
    setShowLoader(true);
    // get a unique id
    let userId = uuid.v4();

    try {
      await firestore().collection('Users').doc(userId).set({
        name: name,
        email: email,
        password: password,
        phone: phone,
        userId: userId,
        userFollowers: followers,
        userFollowing: following,
      });
      // If user created successsfully, hide the loader
      setShowLoader(true);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };

  // signup user
  const handleSignup = async () => {
    // condition 1:check is user already exist, if yes, then redirect to login
    //condition 2 : create an account if not created
    firestore().collection('Users');

    // filter data on the basis of email
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        /* ... */

        const docsData = querySnapshot.docs.map(doc => doc.data());

        if (querySnapshot.docs.length === 0) {
          // create a new user
          createNewUser();
        } else {
          setShowLoader(false); // Hide the loader

          Alert.alert('user already exist');
        }
      })
      .catch(error => {
        setShowLoader(false); // Hide the loader

        console.log(error);
      });
  };

  return (
    <View>
      {/* show loader */}
      {showLoader && <Loader isModalVisible={true} />}
      <CustomInput
        placeholder="enter name"
        icon={require('../assets/user_signup.png')}
        iconHeight={30}
        iconWidth={30}
        onChangeText={text => setName(text)}
      />
      {badName && <Text style={{color: 'red'}}>Not a valid name</Text>}
      <CustomInput
        placeholder="enter email"
        icon={require('../assets/photopie_email.png')}
        iconHeight={30}
        iconWidth={30}
        onChangeText={text => setEmail(text)}
      />
      {badEmail && <Text style={{color: 'red'}}>Not a valid email</Text>}

      <CustomInput
        placeholder="enter phone "
        type={'number-pad'}
        icon={require('../assets/telephone.png')}
        iconHeight={20}
        iconWidth={20}
        onChangeText={text => setPhone(text)}
      />
      {badPhone && <Text style={{color: 'red'}}>Not a valid phone</Text>}

      <CustomInput
        placeholder="enter passsword"
        isSecured={true}
        icon={require('../assets/photopie_password.png')}
        iconHeight={30}
        iconWidth={30}
        onChangeText={text => setPassword(text)}
      />
      {badPassword && <Text style={{color: 'red'}}>Not a valid password</Text>}

      {/* render submit cta */}

      <View style={{marginHorizontal: 16, marginVertical: 32}}>
        <Pressable
          style={{
            backgroundColor: THEME_COLOR2,
            paddingHorizontal: 18,
            // marginHorizontal: 16,
            // marginVertical: 32,
            paddingVertical: 8,
            width: '100%',
            borderRadius: 6,
          }}
          onPress={() => {
            if (validateData()) {
              handleSignup();
            }
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Sign Up
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Already have an account?</Text>

        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
          <Text
            style={{
              color: THEME_COLOR2,
              marginLeft: 6,
              fontWeight: 'bold',
              borderBottomColor: THEME_COLOR2_SHADE_1,
              borderBottomWidth: 1,
            }}>
            Sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: THEME_COLOR4,
  },

  ctaContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 8,
    paddingHorizontal: 18,
  },
});
