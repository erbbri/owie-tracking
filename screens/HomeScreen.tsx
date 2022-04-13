import { StyleSheet, SafeAreaView, Platform, StatusBar, Button} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TrackersContext } from '../context/TrackersContext';
import React, { useContext } from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  
  const colorScheme = useColorScheme();
  
  //use context
  const { trackers } = useContext(TrackersContext);

  //checks that trackers is defined (it is)
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
           <Text style={styles.title}>OwieTracking</Text>
          </View>
        </View>
       <View>
      <Text>Here is our list of trackers</Text>
      { console.log(trackers) }
      {trackers.map((tracker) => (
        <Text key={tracker.id}>{tracker.name} : {tracker.type}</Text>
      ))}
      </View>
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
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
    fontSize: 35,
    fontWeight: 'bold',
    color: "#f1f2f3",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  header: {
    backgroundColor: "#3a5140",
    justifyContent:'center',
  }
});
