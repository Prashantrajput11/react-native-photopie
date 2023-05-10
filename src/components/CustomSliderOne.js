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

const CustomSliderOne = () => {
  // Get screen's width and height
  const {height, width} = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const renderDots = () => {
    return onboardingData.map((slide, index) => {
      return (
        <View
          style={[
            styles.dotIndicator,
            index === currentIndex ? styles.activeDotIndicator : null,
          ]}></View>
      );
    });
  };

  // Handle scrolling

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
            <>
              <View
                style={{
                  // backgroundColor: 'orange',
                  height: height,
                  width: width,
                  marginTop: 100,
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
                  source={slide.image}
                  style={{
                    height: 300,
                    width: 300,
                    borderRadius: 150,
                  }}
                />

                <Text style={styles.onBoardingTitle}>{slide.title}</Text>
                <Text style={styles.onBoardingDescription}>
                  {slide.description}
                </Text>
              </View>
            </>
          );
        })}
      </ScrollView>
      <View style={styles.dotIndicatorContainer}>{renderDots()}</View>
      <View style={styles.onBoardingCtaContainer}>
        {currentIndex === 0 && (
          <Cta
            ctaText="Skip"
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
        {currentIndex > 0 && <Cta ctaText="Previous" />}

        {currentIndex < onboardingData.length - 1 && (
          <Cta
            ctaText="Next"
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
        {currentIndex === onboardingData.length - 1 && (
          <Cta
            ctaText="Start"
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
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
    marginTop: 12,
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
    bottom: 100,
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
    bottom: 30,
    paddingHorizontal: 16,
  },
});
