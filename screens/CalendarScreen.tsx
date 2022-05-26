import { StyleSheet, SafeAreaView, Platform, StatusBar, Button, Image, Pressable, ScrollView, Modal} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { AntDesign } from '@expo/vector-icons'; 
//import Modal from "react-native-modalbox";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import React, { useContext, useState } from 'react';
import { HistoryContext } from '../context/HistoryContext';
import RenderHistory from '../components/RenderHistory';
import { colors } from 'react-native-elements';

import DateTimePicker from '@react-native-community/datetimepicker';

import * as Print from 'expo-print';
import GenerateHTML from '../components/GenerateHTML';
import { Checkbox, IconButton } from 'react-native-paper';

import { TrackersContext } from '../context/TrackersContext';

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
  const { entries, filteredEntries } = useContext(HistoryContext);
  const { trackers } = useContext(TrackersContext); 

  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  //for checklist
  const [checkedState, setCheckedState] = useState(
    new Array(trackers.length + 1).fill('unchecked')
);
  const [trackerNames, setTrackerNames] = useState([])

const setChecked =(item)=> {
  if(item === 'checked'){
    return 'unchecked' 
  }
  else {
   return 'checked'
  }
}

const handleChecked = (position) => {
  const updatedCheckedState = Array.from(checkedState); 
  console.log(updatedCheckedState); 
  updatedCheckedState.forEach((item, index, array) => {
    console.log("position", position)
    console.log(index) 
    if (index === position) {
      array[index] = setChecked(item)
    }}
)
 console.log(updatedCheckedState); 
    setCheckedState(updatedCheckedState); 
};
{/*
const onModalPress =()=> {
  checkedState.ForEach((item, index, array) => {
    if(item == 'checked'){
      trackerNames.push(trackers[index].name);
    }
  }{
  console.log(trackerNames); 
  setModalVisible(false)
}

*/}
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS == 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setText(fDate + '\n')

    console.log(fDate)
  }
  
  const showMode = (currentMode)=> {
    setShow(true);
    setMode(currentMode);
  }



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
      <Modal 
          transparent={true}
          visible={modalVisible}
          
          onRequestClose={() => {      
            setModalVisible(!modalVisible)
          }}>
        
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: '#f1f2f3'}]}>

            <View style={{backgroundColor:'transparent', padding: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
              <Text style={{fontSize: 25, color: Colors[colorScheme].itemtext}}>Tracker Names: </Text>
            </View> 
            {trackers.map((tracker) => (
            <View style={{backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
            key = {tracker.id}
            color={'#3a5140'}
            status={ checkedState[tracker.id] }
            onPress={() => handleChecked(tracker.id)
            }
            ></Checkbox>
            <Text style={{color: Colors[colorScheme].itemtext, fontSize: 20}}>{tracker.name}</Text>
            </View>
          ))}
            <View style={{backgroundColor:'transparent', padding: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
            <Text style={{fontSize: 25, color: Colors[colorScheme].itemtext}}>Date Range: </Text>
            </View>
          
            <View style={{flex: 1, backgroundColor: 'transparent', height: '60%', width: '99%', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
              <Text style={{fontWeight:'bold', fontSize: 20}}>{text}</Text>
              <View style={styles.fixToText}>
                <Button title='Begin Date' color='#3a5140' onPress={() => showMode('date')} />
              
                <Button title='End Date' color='#3a5140' onPress={() => showMode('date')} />
              </View>
              {
                show && (
                  <DateTimePicker
                  testID='dateTimePicker'
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display='default'
                  onChange={onChange}
                />)} 

            </View>
            <View style={{flex: 1, backgroundColor: 'transparent', height: '60%', width: '99%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <IconButton icon="close" style={{backgroundColor: Colors[colorScheme].inputText}} size={30} onPress={() => setModalVisible(!modalVisible)}/>
            </View>
          </View>
        </View>
        
      </Modal>
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
      <Pressable
              onPress={() => setModalVisible(true)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                paddingTop: 5, 
                paddingLeft: 15,
              })}>
                <AntDesign
                  name='filter'
                  size={30}
                  color={Colors[colorScheme].text}
                  style={{marginRight: 15, alignContent: 'center'}}
                /> 
      </Pressable>
      
      {entries.map((entry) => (
        <RenderHistory key={entry.id} trackerType={entry.trackerType} trackerName={entry.trackerName} trackerID={entry.trackerID}
        date={entry.date} checked={entry.checked} scale={entry.scale} input={entry.input}
        color={Colors[colorScheme].itemtext} backgroundColor={Colors[colorScheme].items} dateColor={Colors[colorScheme].date}>
        </RenderHistory>
      ))}
      </ScrollView>
      <View style={styles.bottom}>
        <Pressable
              onPress={() => onPressPrint()}
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'transparent',
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  
  modalView: {
    backgroundColor: '#f1f2f3',
    margin: 20,
    borderRadius: 20,
    width: '90%',
    height: '30%',
    //padding: 20,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  fixToText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
