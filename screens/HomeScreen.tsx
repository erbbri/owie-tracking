import { StyleSheet, SafeAreaView, Platform, StatusBar, Button, ScrollView, Image} from 'react-native';
import 'react-native-gesture-handler'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TrackersContext } from '../context/TrackersContext';
import React, { useContext , useState, useEffect} from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import RenderTracker from '../components/RenderTracker';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  
  const colorScheme = useColorScheme();
  
  //use context
  const { trackers } = useContext(TrackersContext);

  const RightSwipeAction = () => {
    return(
      null
    )
  }
  const [currentDate, setCurrentDate] = useState('');

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

            <Image 
                source={require('../assets/images/owietracking-logo.png')}
                resizeMode={'contain'}
                style={[styles.logo]}
            />
            <Text style={styles.title}>OwieTracking</Text>
          </View>
        </View>
       <ScrollView style={{flex: 1, marginBottom: 6}}>
         <Text style={styles.dateStyle}>{currentDate}</Text>
      { console.log(trackers) }
      {trackers.map((tracker) => (
        //<Text key={tracker.id}>{tracker.name} : {tracker.type}</Text>
      // <Swipeable>
        <RenderTracker key={tracker.id} trackerType={tracker.type} trackerName={tracker.name} sliderMin={tracker.slidermin} sliderMax={tracker.slidermax}
          color={Colors[colorScheme].itemtext} backgroundColor={Colors[colorScheme].items}></RenderTracker>
      // </Swipeable>
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
    paddingTop: 25,
    flexDirection: "row", 
    backgroundColor: "#3a5140",
    justifyContent:'center',
  }, 
  dateStyle: {
    alignSelf: 'center', 
    fontSize: 30
  },
});
