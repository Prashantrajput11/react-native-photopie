import {StyleSheet, Text, View, Alert} from 'react-native';
import uuid from 'react-native-uuid';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import {THEME_COLOR2, THEME_COLOR4} from '../utils/Colors';
import Cta from '../components/Cta';

// Firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const SignupScreen = () => {
  // navigation hook

  const navigation = useNavigation();
  // Init local states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

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
  const createNewUser = () => {
    // get a unique id
    let userId = uuid.v4();

    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        phone: phone,
        password: password,
        userId: userId,
      })
      .then(res => navigation.navigate('LoginScreen'))
      .catch(error => console.log(error));
  };

  // signup user
  const handleSignup = async () => {
    // if validate data is false, stop the signup
    if (!validateData()) {
      return;
    }

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

        console.log(JSON.stringify(querySnapshot.docs));

        if (querySnapshot.docs.length === 0) {
          // create a new user
          createNewUser();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <CustomInput
        placeholder="enter name"
        icon={require('../assets/user.png')}
        onChangeText={text => setName(text)}
      />
      {badName && <Text style={{color: 'red'}}>Not a valid name</Text>}
      <CustomInput
        placeholder="enter email"
        icon={require('../assets/email.png')}
        onChangeText={text => setEmail(text)}
      />
      {badEmail && <Text style={{color: 'red'}}>Not a valid email</Text>}

      <CustomInput
        placeholder="enter phone "
        type={'number-pad'}
        onChangeText={text => setPhone(text)}
      />
      {badPhone && <Text style={{color: 'red'}}>Not a valid phone</Text>}

      <CustomInput
        placeholder="enter passsword"
        isSecured={true}
        onChangeText={text => setPassword(text)}
      />
      {badPassword && <Text style={{color: 'red'}}>Not a valid password</Text>}

      {/* render submit cta */}

      <View style={styles.ctaContainer}>
        <Cta ctaText={'Submit'} bgColor={THEME_COLOR2} onPress={handleSignup} />
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
