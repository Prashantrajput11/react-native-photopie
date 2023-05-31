import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  DARK,
  GRAY,
  LIGHT,
  THEME_COLOR1,
  THEME_COLOR2,
  THEME_COLOR2_SHADE_1,
  THEME_COLOR3,
  THEME_COLOR4,
} from '../utils/Colors';
import BottomSheet from '../components/BottomSheet';
import {jobTitles} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

const Jobs = () => {
  const navigation = useNavigation();

  const [jobs, setJobs] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllJobs();
  }, [isFocused]);

  const getAllJobs = async () => {
    try {
      const querySnapshot = await firestore().collection('Jobs').get();
      const fetchedJobs = querySnapshot.docs.map(doc => doc.data());
      console.log({fetchedJobs});
      setJobs(fetchedJobs);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: THEME_COLOR2_SHADE_1,
          paddingHorizontal: 16,
          paddingVertical: 24,
          marginBottom: 24,
        }}>
        <Pressable
          onPress={() => navigation.navigate('CreateJob')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/new-post.png')}
            style={{height: 20, width: 20}}
          />
          <Text> Post A Job</Text>
        </Pressable>
      </View>

      {/* show job listings */}
      <View
        style={{
          // backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}>
        {/* <Text style={styles.recommendedHeading}>Recommended For You</Text> */}

        <FlatList
          data={jobs}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  marginVertical: 8,
                  borderColor: GRAY,
                  borderWidth: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 6,
                }}>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.jobLocation}>{item.jobLocation}</Text>
                <Text style={styles.workMode}>{item.workplaceType}</Text>
                <Text style={{marginBottom: 12}}>{item.jobType}</Text>
                <Pressable
                  style={{
                    backgroundColor: THEME_COLOR2,
                    borderRadius: 6,
                    // width: 100,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                  }}>
                  <Text style={{color: LIGHT}}>Apply</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  recommendedHeading: {
    fontSize: 24,
    color: DARK,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  jobPostHeading: {
    fontSize: 24,
    color: DARK,
    fontWeight: 'bold',
  },
  jobLabels: {
    fontSize: 20,
    COLOR: DARK,
    fontWeight: '600',
  },

  jobTitle: {
    fontSize: 20,
    color: DARK,
    fontWeight: 'bold',
  },
  companyName: {
    marginVertical: 4,
  },
  jobLocation: {
    marginBottom: 4,
  },
  workMode: {
    marginBottom: 12,
  },
});
