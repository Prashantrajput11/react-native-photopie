import {View, Text} from 'react-native';
import React from 'react';
import CustomSliderOne from '../components/CustomSliderOne';

const WelcomeScreen = ({navigation}) => {
  // Onboarind screens list
  const onboardingData = [
    {
      title: 'Discover and Share',
      description:
        'Explore a world of stunning photos and videos shared by creators and photographers from around the globe.',
      image: 'https://example.com/images/onboarding1.jpg',
    },
    {
      title: 'Connect with Friends',
      description:
        'Follow your friends, family, and favorite creators to see their latest posts and stay updated with their lives.',
      image: 'https://example.com/images/onboarding2.jpg',
    },
    {
      title: 'Express Yourself',
      description:
        'Capture and share your favorite moments, tell your story through photos and videos, and let your creativity shine.',
      image: 'https://example.com/images/onboarding3.jpg',
    },
    {
      title: 'Grow Your Network',
      description:
        'Engage with your audience, receive feedback on your content, and build a community of like-minded individuals.',
      image: 'https://example.com/images/onboarding4.jpg',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <CustomSliderOne />
    </View>
  );
};

export default WelcomeScreen;
