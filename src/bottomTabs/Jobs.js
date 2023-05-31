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
  THEME_COLOR2_SHADE_1,
  THEME_COLOR3,
  THEME_COLOR4,
} from '../utils/Colors';
import BottomSheet from '../components/BottomSheet';
import {jobTitles} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';

// const Jobs = () => {
//   // Create ref for bottomsheet
//   const jobTitleBottomSheetRef = useRef();
//   const companyNameBottomSheetRef = useRef();

//   const [selectedJob, setSelectedJob] = useState('');

//   useEffect(() => {
//     jobTitleBottomSheetRef.current.close();
//   }, [selectedJob]);

//   // onPress={() => setSelectedJob(job.jobTitle)}
//   const renderBottomSheetForJobTitle = () => {
//     return (
//       <BottomSheet
//         ref={jobTitleBottomSheetRef}
//         animationType="slide"
//         height={300}>
//         <ScrollView>
//           {jobTitles.map(job => {
//             return (
//               <View key={job.id}>
//                 <Pressable
//                   style={{
//                     borderTopColor: GRAY,
//                     borderTopWidth: 1,
//                     // marginVertical: 12,
//                     paddingVertical: 12,
//                     backgroundColor: THEME_COLOR2_SHADE_1,
//                   }}
//                   onPress={() => setSelectedJob(job.jobTitle)}>
//                   <Text>{job.jobTitle}</Text>
//                 </Pressable>
//               </View>
//             );
//           })}
//         </ScrollView>
//       </BottomSheet>
//     );
//   };
//   const renderBottomSheetForCompanyName = () => {
//     return (
//       <BottomSheet
//         ref={companyNameBottomSheetRef}
//         animationType="slide"
//         height={200}>
//         <View style={{height: '100%'}}>
//           <Pressable>
//             <Text>Company</Text>
//           </Pressable>
//         </View>
//       </BottomSheet>
//     );
//   };

//   return (
//     <View>
//       <Text style={styles.jobPostHeading}>Let's create a job post</Text>

//       {/* Field - Job Title */}
//       <View>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <Text style={styles.jobLabels}>Job Title</Text>
//           <Pressable onPress={() => jobTitleBottomSheetRef.current.open()}>
//             <Image
//               source={require('../assets/plus.png')}
//               style={{width: 20, height: 20}}
//             />
//           </Pressable>
//           {renderBottomSheetForJobTitle('job')}
//         </View>

//         <TextInput placeholder="select job position" value={selectedJob} />
//       </View>

//       {/* Field - Company Name */}
//       <View>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <Text style={styles.jobLabels}>Company</Text>
//           <Pressable onPress={() => companyNameBottomSheetRef.current.open()}>
//             <Image
//               source={require('../assets/plus.png')}
//               style={{width: 20, height: 20}}
//             />
//           </Pressable>
//           {renderBottomSheetForCompanyName('company')}
//         </View>

//         <TextInput placeholder="select company" />
//       </View>

//       {/* Field - Workplace Type */}
//       <View>
//         <Text style={styles.jobLabels}>Workplace Type</Text>
//         <TextInput placeholder="select workplace type" />
//       </View>

//       {/* Field - Job Location  */}
//       <View>
//         <Text style={styles.jobLabels}>Job Location</Text>
//         <TextInput placeholder="Job Location" />
//       </View>

//       {/* Field - Job Type  */}
//       <View>
//         <Text style={styles.jobLabels}>Job Type</Text>
//         <TextInput placeholder="select workplace type" />
//       </View>
//     </View>
//   );
// };

const Jobs = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: THEME_COLOR4,
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
          backgroundColor: 'orange',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}>
        <Text style={styles.recommendedHeading}>Recommended For You</Text>

        <Text style={styles.jobTitle}>job title</Text>
        <Text>Job Location</Text>
        <Text>Work mode</Text>
        <Pressable>
          <Text>Apply</Text>
        </Pressable>
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
});
