import { StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, Image, Pressable} from 'react-native';
import 'react-native-gesture-handler'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TrackersContext } from '../context/TrackersContext';
import React, { useContext , useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Button } from 'react-native-paper';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import RenderTracker from '../components/RenderTracker';
import { AntDesign } from '@expo/vector-icons';

import { dateDatabase } from '../components/dateDatabase';
import { historyDatabase } from '../components/historyDb';
import { HistoryContext } from '../context/HistoryContext';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      var blankArray = []; 
      searchEntries(blankArray); 
    });

    return unsubscribe;
  }, [navigation]);
  
  const colorScheme = useColorScheme();
  
  //use context
  const { trackers, setDone, refreshTrackers, resetAll } = useContext(TrackersContext);

  const [currentDate, setCurrentDate] = useState('');

  const { searchEntries } = useContext(HistoryContext); 

  useEffect(() => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date().getDate(); // Current Date
    var month = new Date().getMonth(); //Current Month 
    var year = new Date().getFullYear(); //current year 
    let monthName = months[month];
    setCurrentDate(
      monthName  + ' ' + date + ', ' + year
    );
  },[]);

  useEffect(() =>{
    checkDate(); 
  })

  useEffect(()=>{
    var blankArray = []; 
    searchEntries(blankArray); 
  }, [])

  async function checkDate () {
    var day = String(new Date().getDate()).padStart(2, '0'); 
    var month = String(new Date().getMonth() + 1).padStart(2, '0'); 
    var year = new Date().getFullYear(); 
    var currentDate = day + '-' + month + '-' + year; 
  
    var onfileDate = await dateDatabase.getDate();  
  
    if(onfileDate != currentDate){
      resetAll(); 
      refreshTrackers(); 
      dateDatabase.editDate(currentDate, onfileDate); 
      console.log( "date changed to: ", currentDate); 
    }
  }

  function useDone (trackerID) {
    setDone(1, trackerID); 
    refreshTrackers(); 
    console.log("function worked"); 
  }

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

          <View style={[styles.header, {backgroundColor: Colors[colorScheme].tabIconDefault} ]}>

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
         <Text style={styles.dateStyle}>{currentDate}</Text>
      {trackers.map((tracker) => (
        <RenderTracker key={tracker.id} trackerType={tracker.type} trackerName={tracker.name} trackerID={tracker.id}
         sliderMin={tracker.slidermin} sliderMax={tracker.slidermax} done={tracker.done} doneFunction={useDone}
          color={Colors[colorScheme].itemtext} backgroundColor={Colors[colorScheme].items}></RenderTracker>
      ))}
      </ScrollView>
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
    </SafeAreaView>
  );
  } return null; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, 
    height: '100%',
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
  dateStyle: {
    alignSelf: 'center', 
    fontSize: 30
  },
});
