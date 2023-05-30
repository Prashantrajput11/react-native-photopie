import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useWindowDimensions} from 'react-native';
import {GRAY} from '../utils/Colors';
import CustomHeader from '../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  // Init local states
  const [posts, setPosts] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true); // New state variable
  const windowDimensions = useWindowDimensions();

  const getAllPosts = async () => {
    try {
      const querySnapshot = await firestore().collection('posts').get();
      const fetchedPosts = querySnapshot.docs.map(doc => doc.data());
      console.log('fp', fetchedPosts);
      setPosts(fetchedPosts);
      setLoadingImages(false); // Mark images as loaded
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <CustomHeader onIconPress={() => navigation.openDrawer()} />
      <View style={[styles.feedPostContainer]}>
        <FlatList
          data={posts}
          keyExtractor={item => item.postId}
          renderItem={({item}) => (
            <View style={styles.singlePostContainer}>
              <Text style={styles.userCaption}>{item.caption}</Text>
              {loadingImages ? ( // Check if images are still loading
                <Text>Loading</Text>
              ) : (
                <Image
                  source={{
                    uri: item.postImage,
                  }}
                  style={{height: 200, width: 200, width: '100%'}}
                />
              )}
              {/* Display other post details */}
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  feedPostContainer: {
    // backgroundColor: 'orange',
    height: 700,
    marginBottom: 80,
    // alignItems: 'center',
    marginHorizontal: 16,
  },
  singlePostContainer: {
    // backgroundColor: 'green',
    marginVertical: 16,
    borderWidth: 2,
    borderColor: GRAY,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    // paddingBottom: 16,
  },
  userCaption: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
