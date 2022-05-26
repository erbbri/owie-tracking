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

import * as Print from 'expo-print';
import GenerateHTML from '../components/GenerateHTML';

const htmlstart = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="font-family: sans-serif; ">
    <h1 style="text-align: center; font-size: 30px; font-weight: normal;">
      OwieTracking
    </h1>
`;

const htmlend = `
</body>
</html>
`


export default function CalendarScreen({ navigation }: RootTabScreenProps<'Edit'>) {
  
  const colorScheme = useColorScheme();

  //use context
  const { entries } = useContext(HistoryContext);

  const onPressPrint =()=>{
    var htmlMiddle; 
    htmlMiddle = GenerateHTML(entries);
    //removes 'undefined' which is for some reason there
    htmlMiddle = htmlMiddle.slice(9); 
    var htmlComplete = htmlstart + htmlMiddle + htmlend; 
    console.log(htmlComplete);
    Print.printAsync({
      html: htmlComplete
    })

  }

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
      {entries.map((entry) => (
        <RenderHistory key={entry.id} trackerType={entry.trackerType} trackerName={entry.trackerName} trackerID={entry.trackerID}
        date={entry.date} checked={entry.checked} scale={entry.scale} input={entry.input}
        color={Colors[colorScheme].itemtext} backgroundColor={Colors[colorScheme].items} dateColor={Colors[colorScheme].date}>
        </RenderHistory>
      ))}
      </ScrollView>
      <View style={[styles.bottom]}>
        <View style={{ backgroundColor: Colors[colorScheme].background, 
          width: '80%', height: '100%', borderRadius: 100,
          }}> 
        <Pressable
              onPress={() => onPressPrint()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <AntDesign
                name="pdffile1"
                size={40}
                color= {Colors[colorScheme].tint}
                style={{ alignSelf: 'center', paddingTop: 10}}
              />
            </Pressable>
          </View>
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
    height: '9%',
    width: '20%',
  },
  historyStyle: {
    alignSelf: 'center', 
    fontSize:30
  }
});
