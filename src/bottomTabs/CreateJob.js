import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  DARK,
  GRAY,
  LIGHT,
  THEME_COLOR2,
  THEME_COLOR2_SHADE_1,
} from '../utils/Colors';
import BottomSheet from '../components/BottomSheet';
import firestore from '@react-native-firebase/firestore';

import uuid from 'react-native-uuid';
import {jobTitles, companies} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';

const CreateJob = () => {
  const navigation = useNavigation();
  // Create ref for bottomsheet
  const jobTitleBottomSheetRef = useRef();
  const companyNameBottomSheetRef = useRef();

  const [selectedJob, setSelectedJob] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    jobTitleBottomSheetRef.current.close();
  }, [selectedJob]);

  // Useffect , will
  useEffect(() => {
    // close bottomsheet when new option is selected
    companyNameBottomSheetRef.current.close();
  }, [selectedCompany]);

  // onPress={() => setSelectedJob(job.jobTitle)}
  const renderBottomSheetForJobTitle = () => {
    return (
      <BottomSheet
        ref={jobTitleBottomSheetRef}
        animationType="slide"
        height={300}>
        <ScrollView>
          {jobTitles.map(job => {
            return (
              <View key={job.id}>
                <Pressable
                  style={{
                    borderTopColor: GRAY,
                    borderTopWidth: 1,
                    // marginVertical: 12,
                    paddingVertical: 12,
                    backgroundColor: THEME_COLOR2_SHADE_1,
                  }}
                  onPress={() => setSelectedJob(job.jobTitle)}>
                  <Text>{job.jobTitle}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </BottomSheet>
    );
  };
  const renderBottomSheetForCompanyName = () => {
    return (
      <BottomSheet
        ref={companyNameBottomSheetRef}
        animationType="slide"
        height={200}>
        <ScrollView>
          {companies.map(company => {
            return (
              <View key={company.id}>
                <Pressable
                  style={{
                    borderTopColor: GRAY,
                    borderTopWidth: 1,
                    // marginVertical: 12,
                    paddingVertical: 12,
                    backgroundColor: THEME_COLOR2_SHADE_1,
                  }}
                  onPress={() => setSelectedCompany(company.companyName)}>
                  <Text>{company.companyName}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </BottomSheet>
    );
  };

  // Upload Data to Firebase

  const uploadJobData = async () => {
    // Generate unique id for the post
    const JobId = uuid.v4();

    try {
      await firestore().collection('Jobs').doc(JobId).set({
        jobTitle: selectedJob,
        companyName: selectedCompany,
      });

      console.log('jod data updated');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{marginHorizontal: 16, marginTop: 18}}>
      <Text style={styles.jobPostHeading}>Let's create a job post</Text>

      {/* Field - Job Title */}
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.jobLabels}>Job Title</Text>
          <Pressable onPress={() => jobTitleBottomSheetRef.current.open()}>
            <Image
              source={require('../assets/plus.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
          {renderBottomSheetForJobTitle('job')}
        </View>

        <TextInput placeholder="select job position" value={selectedJob} />
      </View>

      {/* Field - Company Name */}
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.jobLabels}>Company</Text>
          <Pressable onPress={() => companyNameBottomSheetRef.current.open()}>
            <Image
              source={require('../assets/plus.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
          {renderBottomSheetForCompanyName('company')}
        </View>

        <TextInput placeholder="select company" value={selectedCompany} />
      </View>

      {/* Field - Workplace Type */}
      <View>
        <Text style={styles.jobLabels}>Workplace Type</Text>
        <TextInput placeholder="select workplace type" />
      </View>

      {/* Field - Job Location  */}
      <View>
        <Text style={styles.jobLabels}>Job Location</Text>
        <TextInput placeholder="Job Location" />
      </View>

      {/* Field - Job Type  */}
      <View>
        <Text style={styles.jobLabels}>Job Type</Text>
        <TextInput placeholder="select workplace type" />
      </View>

      {/* Pressable for creating Post */}
      <Pressable
        style={{
          backgroundColor: THEME_COLOR2,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
          width: 100,
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onPress={() => uploadJobData()}>
        <Text style={{color: LIGHT}}>Post Job</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: THEME_COLOR2,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
          width: 100,
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{color: LIGHT}}>go Back</Text>
      </Pressable>
    </View>
  );
};

export default CreateJob;

const styles = StyleSheet.create({
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
});
