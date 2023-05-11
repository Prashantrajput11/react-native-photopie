import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';

import {THEME_COLOR2, LIGHT, DARK} from '../utils/Colors';
import Cta from './Cta';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSliderOne = () => {
  // import useNavigation hook
  const navigation = useNavigation();

  // Get screen's width and height
  const {height, width} = useWindowDimensions();

  // init local states
  const [currentIndex, setCurrentIndex] = useState(0);

  // Onboarding screens data
  let onboardingData = [
    {
      id: 1,
      headerTitle: 'PhotoPie',
      headerDescription: 'Share Photos instantly',
      title: 'Welcome to PhotoPie',
      description:
        'Discover and share amazing content with friends and family.',
      image: require('../assets/onboarding1_photopie.png'),
    },
    {
      id: 2,
      headerTitle: 'PhotoPie',
      headerDescription: 'Share Photos instantly',

      title: 'Stay Connected',
      description: 'Keep up with your friends and see what they are up to..',
      image: require('../assets/onboarding2_photopie.png'),
    },
    {
      id: 3,
      headerTitle: 'PhotoPie',
      headerDescription: 'Share Photos instantly',

      title: 'Share Your Moments',
      description: 'Capture and share your favorite moments with the world..',
      image: require('../assets/onboarding3_photopie.png'),
    },
  ];

  // Set new user data to async storage
  const setUserData = async () => {
    AsyncStorage.setItem('IS_NEW_USER', true);

    navigation.navigate('LoginScreen');
  };

  // Render onboarding screen indicators
  const renderOnboardingIndicators = () => {
    return onboardingData.map((slide, index) => {
      return (
        <View
          key={slide.id.toString()}
          style={[
            styles.dotIndicator,
            index === currentIndex ? styles.activeDotIndicator : null,
          ]}></View>
      );
    });
  };

  // Handle user's scroll
  const handleScroll = event => {
    let scrollPosition = event.nativeEvent.contentOffset.x;

    let index = Math.round(scrollPosition / width);

    setCurrentIndex(index);
  };
  return (
    <View style={{flex: 1, backgroundColor: THEME_COLOR2}}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}>
        {onboardingData.map((slide, index) => {
          return (
            <View
              key={slide.id.toString()}
              style={{
                // backgroundColor: 'orange',
                height: height,
                width: width,
                marginTop: 70,
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.onBoardingheaderTitle}>
                {slide.headerTitle}
              </Text>
              <Text style={styles.onBoardingHeaderDescription}>
                {slide.headerDescription}
              </Text>
              <Image
                source={currentIndex <= 2 && onboardingData[currentIndex].image}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: 150,
                }}
              />

              <Text style={styles.onBoardingTitle}>
                {onboardingData[currentIndex].title}
              </Text>
              <Text style={styles.onBoardingDescription}>
                {onboardingData[currentIndex].description}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.dotIndicatorContainer}>
        {renderOnboardingIndicators()}
      </View>
      <View style={styles.onBoardingCtaContainer}>
        {/* if currrent index is 0, only then show skip button */}
        {currentIndex === 0 && (
          <Cta
            ctaText="Skip"
            onPress={() => navigation.navigate('LoginScreen')}
          />
        )}
        {/* if current index is greater then 0, that is the screen is either screen no 2 or screen no 3, show previous */}
        {currentIndex > 0 && (
          <Cta
            ctaText="Previous"
            onPress={() => setCurrentIndex(currentIndex - 1)}
          />
        )}
        {/* if current index is less then onboarding screens length -1 , keep showing next button,otherwise show start */}
        {currentIndex < onboardingData.length - 1 && (
          <Cta
            ctaText="Next"
            onPress={() => setCurrentIndex(currentIndex + 1)}
          />
        )}
        {/* // if current index is equal to array length -1, i.e last screen is reached, only then show start */}
        {currentIndex === onboardingData.length - 1 && (
          <Cta ctaText="Start" onPress={() => setUserData()} />
        )}
      </View>
    </View>
  );
};

export default CustomSliderOne;

const styles = StyleSheet.create({
  onBoardingTitle: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: 'bold',
  },
  onBoardingDescription: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 12,
  },
  onBoardingHeaderDescription: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 12,
  },

  onBoardingheaderTitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },

  dotIndicatorContainer: {
    position: 'absolute',
    bottom: 160,
    width: '100%',
    // backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  dotIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 4,

    backgroundColor: LIGHT,

    alignItems: 'center',
  },

  activeDotIndicator: {
    backgroundColor: '#777db1',
  },

  onBoardingCtaContainer: {
    // backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 60,
    paddingHorizontal: 16,
  },
});
