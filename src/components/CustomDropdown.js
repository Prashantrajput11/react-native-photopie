import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {GRAY} from '../utils/Colors';

const CustomDropdown = ({onPress, citiesList}) => {
  return (
    <View>
      <Text>CustomDropdown</Text>

      <ScrollView style={{backgroundColor: '#fff', height: 200}}>
        {citiesList.map(city => {
          return (
            <View>
              <Pressable
                style={{
                  borderTopColor: GRAY,
                  borderTopWidth: 1,
                  // marginVertical: 12,
                  backgroundColor: 'orange',
                }}
                onPress={() => alert(city.id)}>
                <Text>{city.cityName}</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({});
