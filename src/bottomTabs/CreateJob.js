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
import {
  jobTitles,
  companies,
  workplaceTypes,
  citiesList,
  jobTypes,
} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/Loader';

const CreateJob = () => {
  const navigation = useNavigation();
  // Create ref for bottomsheet
  const jobTitleBottomSheetRef = useRef();
  const companyNameBottomSheetRef = useRef();
  const workPlaceTypeBottomSheetRef = useRef();
  const jobLocationBottomSheetRef = useRef();
  const jobTypeBottomSheetRef = useRef();

  const [selectedJob, setSelectedJob] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedWorkplaceType, setSelectedWorkplaceType] = useState('');
  const [selectedJobLocation, setSelectedJobLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    jobTitleBottomSheetRef.current.close();
  }, [selectedJob]);

  // Useffect , will
  useEffect(() => {
    // close bottomsheet when new option is selected
    companyNameBottomSheetRef.current.close();
  }, [selectedCompany]);

  useEffect(() => {
    // close bottomsheet when new option is selected
    workPlaceTypeBottomSheetRef.current.close();
  }, [selectedWorkplaceType]);

  useEffect(() => {
    // close bottomsheet when new option is selected
    jobLocationBottomSheetRef.current.close();
  }, [selectedJobLocation]);

  useEffect(() => {
    // close bottomsheet when new option is selected
    jobTypeBottomSheetRef.current.close();
  }, [selectedJobType]);

  // Bottom Sheet For Workplace type
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
                    // backgroundColor: THEME_COLOR2_SHADE_1,
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

  // Bottom Sheet For Workplace type
  const renderBottomSheetForWorkPlaceType = () => {
    return (
      <BottomSheet
        ref={workPlaceTypeBottomSheetRef}
        animationType="slide"
        height={200}>
        <ScrollView>
          {workplaceTypes.map(workplace => {
            return (
              <View key={workplace.id}>
                <Pressable
                  style={{
                    borderTopColor: GRAY,
                    borderTopWidth: 1,
                    // marginVertical: 12,
                    paddingVertical: 12,
                    // backgroundColor: THEME_COLOR2_SHADE_1,
                  }}
                  onPress={() => setSelectedWorkplaceType(workplace.type)}>
                  <Text>{workplace.type}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </BottomSheet>
    );
  };

  // BottomSheet For Company
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
                    // backgroundColor: THEME_COLOR2_SHADE_1,
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

  // BottomSheet For Job Location
  const renderBottomSheetForJobLocation = () => {
    return (
      <BottomSheet
        ref={jobLocationBottomSheetRef}
        animationType="slide"
        height={200}>
        <ScrollView>
          {citiesList.map(city => {
            return (
              <View key={city.id}>
                <Pressable
                  style={{
                    borderTopColor: GRAY,
                    borderTopWidth: 1,
                    // marginVertical: 12,
                    paddingVertical: 12,
                    // backgroundColor: THEME_COLOR2_SHADE_1,
                  }}
                  onPress={() => setSelectedJobLocation(city.cityName)}>
                  <Text>{city.cityName}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </BottomSheet>
    );
  };

  // BottomSheet For Job Type
  const renderBottomSheetForJobType = () => {
    return (
      <BottomSheet
        ref={jobTypeBottomSheetRef}
        animationType="slide"
        height={300}>
        <ScrollView>
          {jobTypes.map(job => {
            return (
              <View key={job.id}>
                <Pressable
                  style={{
                    borderTopColor: GRAY,
                    borderTopWidth: 1,
                    // marginVertical: 12,
                    paddingVertical: 12,
                    // backgroundColor: THEME_COLOR2_SHADE_1,
                  }}
                  onPress={() => setSelectedJobType(job.type)}>
                  <Text>{job.type}</Text>
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
    setShowLoader(true);
    try {
      await firestore().collection('Jobs').doc(JobId).set({
        jobTitle: selectedJob,
        companyName: selectedCompany,
        workplaceType: selectedWorkplaceType,
        jobLocation: selectedJobLocation,
        jobType: selectedJobType,
      });

      console.log('jod data updated');
      setShowLoader(false);
      navigation.goBack();
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 18,
        borderWidth: 2,
        borderColor: GRAY,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
      }}>
      {showLoader && <Loader isModaVisible={true} />}
      <Text style={styles.jobPostHeading}>Let's create a job post</Text>

      {/* Field - Job Title */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: GRAY,
          // backgroundColor: 'green',
          paddingVertical: 16,
        }}>
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
            // backgroundColor: 'orange',
            // width: '100%',
          }}>
          <Text style={[styles.jobLabels, {flex: 1}]}>Job Title</Text>

          <Pressable onPress={() => jobTitleBottomSheetRef.current.open()}>
            <Image
              source={require('../assets/pencil.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
          {renderBottomSheetForJobTitle('job')}
        </View>

        <TextInput placeholder="Select Job Position" value={selectedJob} />
      </View>

      {/* Field - Company Name */}
      <View style={{borderBottomWidth: 1, borderBottomColor: GRAY}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 16,
          }}>
          <Text style={[styles.jobLabels, {flex: 1}]}>Company</Text>
          <Pressable
            onPress={() => companyNameBottomSheetRef.current.open()}
            style={{alignSelf: 'flex-end'}}>
            <Image
              source={require('../assets/pencil.png')}
              style={{width: 20, height: 20, alignSelf: 'flex-end'}}
            />
          </Pressable>
          {renderBottomSheetForCompanyName('company')}
        </View>

        <TextInput placeholder="Select Company" value={selectedCompany} />
      </View>

      {/* Field - Workplace Type */}
      <View style={{borderBottomWidth: 1, borderBottomColor: GRAY}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            paddingVertical: 16,
          }}>
          <Text style={[styles.jobLabels, {flex: 1}]}>Workplace Type</Text>
          <Pressable onPress={() => workPlaceTypeBottomSheetRef.current.open()}>
            <Image
              source={require('../assets/pencil.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
          {renderBottomSheetForWorkPlaceType()}
        </View>
        <TextInput
          placeholder="Select workplace Type"
          value={selectedWorkplaceType}
        />
      </View>

      {/* Field - Job Location  */}
      <View style={{borderBottomWidth: 1, borderBottomColor: GRAY}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 16,
          }}>
          <Text style={[styles.jobLabels, {flex: 1}]}>Job Location</Text>
          <Pressable onPress={() => jobLocationBottomSheetRef.current.open()}>
            <Image
              source={require('../assets/pencil.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
          {renderBottomSheetForJobLocation()}
        </View>
        <TextInput
          placeholder=" Select Job Location"
          value={selectedJobLocation}
        />
      </View>

      {/* Field - Job Type  */}
      <View style={{borderBottomWidth: 1, borderBottomColor: GRAY}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 16,
          }}>
          <Text style={[styles.jobLabels, {flex: 1}]}>Job Type</Text>
          <Pressable onPress={() => jobTypeBottomSheetRef.current.open()}>
            <Image
              source={require('../assets/pencil.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
          {renderBottomSheetForJobType()}
        </View>
        <TextInput placeholder="Select Job type" value={selectedJobType} />
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
          marginTop: 20,
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
          marginTop: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{color: LIGHT}}>Go Back</Text>
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
    color: DARK,
    fontWeight: '600',
    // backgroundColor: 'orange',
    // width: 200,
    // marginRight: 18,
  },
});
