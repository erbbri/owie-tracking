import {StyleSheet, SafeAreaView, Platform, StatusBar, Image, ScrollView, Modal} from 'react-native';
import React, { useContext, useState } from 'react';
import { Button } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons'; 



import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { TrackersContext } from '../context/TrackersContext';
import { HistoryContext } from '../context/HistoryContext';

export default function UserScreen() {

  const colorScheme = useColorScheme();
  const { removeAllTrackers } = useContext(TrackersContext)
  const { removeAllEntries } = useContext(HistoryContext)

  const [trackerModalVisible, setTrackerModalVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  
  const deleteTrackers = async ()=>{
    await removeAllTrackers(); 
    setTrackerModalVisible(false); 
    callConfirmModal(); 
  }

  const deleteHistory =()=> {
    removeAllEntries(); 
    setHistoryModalVisible(false); 
    callConfirmModal(); 
  }

  const callConfirmModal =()=> {
    setConfirmModalVisible(true)

    setTimeout(() => {
      setConfirmModalVisible(false)
    }, 2000) 

  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>

    <ScrollView style={{flex: 1, marginBottom: 6}}>
       {/*} <Text style={styles.titleText}>User Information</Text>
          <View style={[styles.view, {backgroundColor: Colors[colorScheme].inputBackground}]}>
            <Text style={[styles.textStyle]}>

            </Text>
    </View> */}

    <Modal
          transparent={true}
          visible={confirmModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={[styles.confirmModalView, {backgroundColor: Colors[colorScheme].text}]}>
            <View style={{backgroundColor:'transparent', padding: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
              <Text style={{color: Colors[colorScheme].itemtext, fontSize: 20}}>Deletion was successful</Text>
            </View>
            </View>
          </View>
      </Modal>
      <Modal
          transparent={true}
          visible={trackerModalVisible}
          onRequestClose={() => {
            setTrackerModalVisible(!trackerModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: Colors[colorScheme].items }]}>
            <View style={{backgroundColor:'transparent', padding: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
              <Text style={{color: Colors[colorScheme].itemtext, fontSize: 25}}> 
                Are you sure you want to delete?</Text> 
             </View> 
            <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-around', margin: 3, flex: 1 }}>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={Colors[colorScheme].background} size={40} onPress={() => deleteTrackers()}> Yes, Delete </Button>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={Colors[colorScheme].background}  size={40} onPress={() => setTrackerModalVisible(!trackerModalVisible)}> No Go Back</Button>
            </View>
            </View>
            </View>
      </Modal>
      <Modal
          transparent={true}
          visible={historyModalVisible}
          onRequestClose={() => {
            setHistoryModalVisible(!historyModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: Colors[colorScheme].items }]}>
            <View style={{backgroundColor:'transparent', padding: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 2}}>
              <Text style={{color: Colors[colorScheme].itemtext, fontSize: 25}}> 
                Are you sure you want to delete all trackers?</Text> 
             </View> 
            <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-around', margin: 3, flex: 1 }}>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={Colors[colorScheme].background} size={40} onPress={() => deleteHistory()}> Yes, Delete </Button>
            <Button style={{width: '48%', borderRadius: 15, justifyContent: 'center'}} mode="contained" color={Colors[colorScheme].background}  size={40} onPress={() => setHistoryModalVisible(!historyModalVisible)}> No Go Back</Button>
            </View>
            </View>
            </View>
      </Modal>

        <View>
        <Button color={Colors[colorScheme].tabIconDefault} mode='contained' onPress={()=> setTrackerModalVisible(true)}> 
          Delete All Trackers </Button>
        </View>
        <View style={{marginTop: 2}}>
          <Button color={Colors[colorScheme].tabIconDefault} mode='contained' onPress={()=> setHistoryModalVisible(true)}> Delete All User History </Button>
        </View>
        <Text style={styles.titleText}>About OwieTracking</Text>
          <View style={[styles.view, {backgroundColor: Colors[colorScheme].inputBackground}]}>
            <Text style={[styles.textStyle]}>
            OwieTracking is a highly customizable, and flexible tracking application specifically designed for those who struggle with chronic health conditions.
            You, the user, can create as many trackers as needed that will allow you to record all data you want to track. 
            {'\n'}{'\n'}
	          <Text style={{fontWeight:'bold'}}>
               In this version of the OwieTracking, we have the following trackers implemented: Checkbox, Slider, and Textbox. 
            </Text>
            {'\n'}{'\n'}
              Hopefully, using these trackers, you will be better equipped to identify patterns in your health and seek better treatment.
            </Text>
          </View>
        <Text style={styles.titleText}>How to Use OwieTracking</Text>
          <View style={[styles.view, {backgroundColor: Colors[colorScheme].inputBackground}]}>
            <Text style={[styles.textStyle]}>
            <AntDesign name="home" size={24} color={Colors[colorScheme].inputText}></AntDesign>
            <Text style={{fontWeight:'bold'}}>  Home Screen</Text>
            {'\n'}On the Home Screen you will find all of the trackers you 
            have created that need to be recorded for the current day. Here 
            you can record and save your data.
            
            {'\n'}{'\n'}
            <AntDesign name="edit" size={24} color={Colors[colorScheme].inputText}></AntDesign>
            <Text style={{fontWeight:'bold'}}>  Edit Tracker Screen</Text>
            {'\n'}On the Edit Tracker Screen you will be able to edit tracker names 
            (by tapping 
              <AntDesign name="edit" size={22} color={Colors[colorScheme].inputText}></AntDesign>
               on the tracker you want to change), or 
              delete the tracker all together (by tapping  
              <AntDesign name="delete" size={22} color={Colors[colorScheme].inputText}></AntDesign>
              on the 
            tracker you want to delete)
            {'\n'}
            <Text style={{fontWeight:'bold', fontSize:17}}> Add Tracker Button is on Edit Tracker Page!</Text>
            {'\n'}{'\n'}
            <AntDesign name="calendar" size={24} color={Colors[colorScheme].inputText}></AntDesign>
            <Text style={{fontWeight:'bold'}}>  History Screen</Text>
            {'\n'}On the History Screen you can see the data you have recorded on previous days.
            Also, here you can filter your data to more easily view your collected data. 
            {'\n'}
            <Text style={{fontWeight:'bold', fontSize:17}}> Export to PDF Button is on History Page!</Text>
            
            {'\n'}{'\n'}
            <AntDesign name="pluscircle" size={24} color={Colors[colorScheme].inputText}></AntDesign>
            <Text style={{fontWeight:'bold'}}>  Add Tracker Button</Text>
            {'\n'}By tapping on the add tracker button (found on the edit trackers screen)
            you will be taken to a new screen where you can create new trackers and associated 
            push notifications. Here you are able to name your tracker, choose the type of tracker 
            you would like to have, and set up notifications for said tracker. 
            {'\n'}{'\n'}
            <AntDesign name="pdffile1" size={24} color={Colors[colorScheme].inputText}></AntDesign>
            <Text style={{fontWeight:'bold'}}>  Export to PDF Button</Text>
            {'\n'}By tapping on the export to PDF button (found on the history screen)
            you will be able to export your data history to a PDF. 
            {'\n'}{'\n'}
            </Text>
          </View>
      <Text style={styles.titleText}>Frequently Asked Questions</Text>
        <View style={[styles.view, {backgroundColor: Colors[colorScheme].inputBackground}]}>
          <Text style={[styles.textStyle]}>
          <Text style={{fontWeight:'bold'}}>How is my data saved?</Text>
          {'\n'}OwieTracking uses a SQLite database, which means that all of 
          your data is stored locally on your phone. Your data will never go to the 
          cloud unless you upload your exported PDF there! 
          {'\n'}{'\n'}
          <Text style={{fontWeight:'bold'}}>Does this violate HIPAA?</Text>
          {'\n'}Nope! Because only you have access to your data and you would have
          to physically export that data if you would like to show it to your health 
          provider. 
          </Text>
        </View>
        
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

    </ScrollView>
    <EditScreenInfo path="/screens/UserScreen.tsx" />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    paddingLeft: 6, 
    paddingRight: 6, 
    fontSize: 22,
  },
  view: {
    marginLeft: '2%',
    marginRight: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 3,
    paddingBottom: 3,
    borderColor: '#3a5140',
    borderWidth: 1,
    flex: 1,
  },
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
    paddingTop: 10, 
    paddingBottom: 10, 
    flexDirection: "row",
    backgroundColor: "#3a5140",
    justifyContent:'center',
  }, 
  titleText: {
    alignSelf: 'center', 
    fontSize: 30, 
  },
  subtitleText:{
    justifyContent: 'center', 
    fontSize: 25, 
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: 'transparent',
  },

  confirmModalView: {
    //margin: 10,
    borderRadius: 10,
    width: '90%',
    height: '10%',
    //padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    
  },

  modalView: {
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
});

