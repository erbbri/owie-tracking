import { StyleSheet, SafeAreaView, Platform, Image, StatusBar, Button, Pressable, Modal, ScrollView} from 'react-native';
import React, { useState, useContext } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { AntDesign } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { colors } from 'react-native-elements';

import { TrackersContext } from '../context/TrackersContext';
import EditTracker from '../components/EditTracker';

export default function EditScreen({ navigation }: RootTabScreenProps<'Edit'>) {
  const colorScheme = useColorScheme();

  //use context
  const { trackers, removeTracker, refreshTrackers } = useContext(TrackersContext);

  const remove =(trackerName)=> {
    console.log('refreshing trackers'); 
    removeTracker(trackerName); 
    refreshTrackers; 
  }


  if (typeof trackers !== 'undefined'){
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
      <View
        style={{
          backgroundColor: Colors[colorScheme].tabIconDefault,
          width: "100%",
          height: "10%",
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <View style={[styles.header, {backgroundColor: Colors[colorScheme].tabIconDefault}]}>
          <Image 
            source={require('../assets/images/owietracking-logo.png')}
            resizeMode={'contain'}
            style={[styles.logo]}
          />
          <Text style={styles.title}>OwieTracking</Text>
          <Pressable
              onPress={() => navigation.navigate('User')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                paddingTop: 5, 
                paddingLeft: 40,
              })}>
              <AntDesign
                name="user"
                size={35}
                color='#f1f2f3'
              />
            </Pressable>
        </View>
      </View>

      <ScrollView style={{flex: 1, marginBottom: 6}}>
        <Text style={styles.editTitle}>Edit Trackers</Text>
      {trackers.map((tracker) => (
        <View>
        <EditTracker key={tracker.id} trackerType={tracker.type} trackerName={tracker.name} 
          trackerID={tracker.id}
          sliderMin={tracker.slidermin} sliderMax={tracker.slidermax}
          color={Colors[colorScheme].itemtext} backgroundColor={Colors[colorScheme].items}></EditTracker>
        </View>
      ))}
      </ScrollView>
      <View style={styles.bottom}>
        <Pressable
              onPress={() => navigation.navigate('Create')}
              style={
                ({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <AntDesign
                name="pluscircle"
                size={40}
                color= {Colors[colorScheme].tint}
                style={{marginRight: 15, borderRadius: 100, backgroundColor: Colors[colorScheme].background }}               
              />
            </Pressable>
            </View>
      <EditScreenInfo path="/screens/EditScreen.tsx" />
    </SafeAreaView>
  );
  } return null; 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    paddingLeft: 10, 
    fontSize: 35,
    fontWeight: 'bold',
    color: "#f1f2f3",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logo: {
    width: 45, 
    height: 45
  },
  header: {
    paddingTop: 15, 
    paddingBottom: 15,
    flexDirection: "row",
    width: '100%',
    justifyContent:'center',
  },

  bottom: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent'
  },
  editTitle: {
    alignSelf: 'center', 
    fontSize: 30
  },
  pressable: {
    borderRadius: 100,


  },
});
