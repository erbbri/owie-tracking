import { StyleSheet, SafeAreaView, Platform, StatusBar, Button, Image, Pressable, ScrollView} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { AntDesign } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import React, { useContext, useState } from 'react';
import { HistoryContext } from '../context/HistoryContext';
import RenderHistory from '../components/RenderHistory';
import { colors } from 'react-native-elements';


export default function CalendarScreen({ navigation }: RootTabScreenProps<'Edit'>) {
  
  const colorScheme = useColorScheme();

  //use context
  const { entries } = useContext(HistoryContext);

  //checks that entries is defined (it is)
  if (typeof entries !== 'undefined'){
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
      <Text style={styles.historyStyle}>History</Text>
      { console.log(entries) }
      {entries.map((entry) => (
        <RenderHistory key={entry.id} trackerType={entry.trackerType} trackerName={entry.trackerName} trackerID={entry.trackerID}
        date={entry.date} checked={entry.checked} scale={entry.scale} input={entry.input}
        color={Colors[colorScheme].itemtext} backgroundColor={Colors[colorScheme].items} dateColor={Colors[colorScheme].date}>
        </RenderHistory>
      ))}
      </ScrollView>
      <View style={styles.bottom}>
        <Pressable
              onPress={() => navigation.navigate('Pdf')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <AntDesign
                name="pdffile1"
                size={40}
                color= {Colors[colorScheme].tint}
                style={{ marginRight: 15}}
              />
            </Pressable>
            </View>
      <EditScreenInfo path="/screens/CalendarScreen.tsx" />
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
    backgroundColor: "#3a5140",
    justifyContent:'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent', 
  },
  historyStyle: {
    alignSelf: 'center', 
    fontSize:30
  }
});
