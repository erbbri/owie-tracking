import { StyleSheet, SafeAreaView, Platform, StatusBar, Switch, ScrollView} from 'react-native';
import { Button, TextInput } from 'react-native';
import { BottomNavigation, Modal, RadioButton, Checkbox } from 'react-native-paper';
import { Formik, Field, validateYupSchema } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as yup from 'yup';

import EditScreenInfo from '../components/EditScreenInfo';
import React, {useState, useContext, useEffect, useRef} from 'react';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { TrackersContext } from '../context/TrackersContext';
import { NotificationsContext } from '../context/NotificationsContext'
import { ThemeContext } from 'react-native-elements';
import { resolveUri } from 'expo-asset/build/AssetSources';



export default function AddScreen(this: any, { navigation }) {
  const colorScheme = useColorScheme();
  const trackersContext = useContext(TrackersContext)
  const notificationsContext = useContext(NotificationsContext)
  const textBody = 'Time to update owietracking!'

  const { trackers, addNewTracker, checkTracker, refreshTrackers} = trackersContext;
  const { sendPushNotification, Notification, registerForPushNotificationsAsync, cancelNotification } = notificationsContext; 
  const testMin = 0; 
  const testMax = 10; 
//For Date/Time Picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('12:00 AM');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS == 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    if (tempDate.getHours() > 12){
      if (tempDate.getMinutes() < 10){
        let fTime = tempDate.getHours() - 12 + ':0' + tempDate.getMinutes() + ' PM';
        setText(fTime)
      }
      else{
        let fTime = tempDate.getHours() - 12 + ':' + tempDate.getMinutes() + ' PM';
        setText(fTime)
      }
    }
    else if (tempDate.getHours() === 0) {
      if (tempDate.getMinutes() < 10){
        let fTime = tempDate.getHours() + 12 + ':0' + tempDate.getMinutes() + ' AM';
        setText(fTime)
      }
      else{
        let fTime = tempDate.getHours()+ 12 + ':' + tempDate.getMinutes() + ' AM';
        setText(fTime)
      }
    }
    else{
      if (tempDate.getMinutes() < 10){
        let fTime = tempDate.getHours() + ':0' + tempDate.getMinutes() + ' AM';
        setText(fTime)
      }
      else{
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ' AM';
        setText(fTime)
      }
    }
  }
  const showMode = (currentMode)=> {
    setShow(true);
    setMode(currentMode);
  }

  const trackerValidationSchema = yup.object().shape ({
    name: yup
      .string()
      .required('Tracker Name is required'),

    type: yup
      .string()
      .oneOf(['checkbox', 'slider', 'text'])
      .required("Tracker type must be selected"),

    min: yup
      .number()
      .typeError("Min must be a number")
      .required("enter Min")
      .min(0),

    max: yup
      .number()
      .max(25)
      .when('min', (min) => {
          if (min) {
              return yup.number()
                  .min((min + 1), 'Max must be greater than min')
                  .typeError("Max must be a number")
                  .required("enter Max")
          }
      }),
  })


  const insertTracker = async (name, type, min, max, switchvalue) => {
    var notifID = 0; 
    if(switchvalue == true){
      const notifID = await sendPushNotification(name, textBody, date);
      console.log(notifID); 
      addNewTracker(name, type, parseInt(min), parseInt(max), notifID, 0); 
    }
    else{
    addNewTracker(name, type, parseInt(min), parseInt(max), '', 0); 
    }
    goBack();
  }

  const goBack = () => {
    navigation.navigate('Root', { screen: 'Edit' });
    console.log('go back');
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
    <ScrollView>
      <Text style={[styles.title, {color: Colors[colorScheme].text}]}>Create New Tracker</Text>
      <Formik
        validationSchema={trackerValidationSchema}
        initialValues={{ name: '', type: '', min: '0', max: '10', switch: false}}
        onSubmit={values => insertTracker(values.name, values.type, values.min, values.max, values.switch)}
        validateOnMount={true}
      >

        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, isValid}) => (
        <View style={{paddingTop: 10}}>
          <Text style={styles.text}>Tracker Name</Text>
          <TextInput
            name="name"
            style = {{fontSize: 20, backgroundColor: Colors[colorScheme].inputBackground, color: Colors[colorScheme].inputText}}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {errors.name &&
            <Text style={{ fontSize: 15, color: Colors[colorScheme].tint }}>{errors.name}</Text>
          }
          <View style={{paddingTop: 20, paddingBottom: 10}}>
           <RadioButton.Group
                     onValueChange={handleChange('type')}
                     value={values.type}

                     >
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <RadioButton key={1} value='checkbox' color= {Colors[colorScheme].radioButton}></RadioButton>
                       <Text style={styles.text}>Checkbox</Text>
                   </View>
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <RadioButton key={2} value='slider' color= {Colors[colorScheme].radioButton}></RadioButton>
                       <Text style={styles.text}>Slider</Text>
                   </View>
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <RadioButton key={3} value='text' color= {Colors[colorScheme].radioButton}></RadioButton>
                       <Text style={styles.text}>Text</Text>
                   </View>
               </RadioButton.Group>
               {errors.type &&
                <Text style={{ fontSize: 15, color: Colors[colorScheme].tint }}>{errors.radioGroup}</Text>
              }
               </View>
              {values.type == "slider" && [
              <View>
              <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 20}}>
                <Text style={styles.text}>Min: </Text>
                <TextInput
                keyboardType='numeric'
                name="min"
                style = {{fontSize: 20, backgroundColor: Colors[colorScheme].inputBackground, color: Colors[colorScheme].inputText, marginRight: 10}}
                key = {4}
                onChangeText={handleChange('min')}
                onBlur={handleBlur('min')}
                value={values.min}
                />
                <Text style={styles.text}>Max: </Text>
                <TextInput
                keyboardType='numeric'
                name="max"
                style = {{fontSize: 20, backgroundColor: Colors[colorScheme].inputBackground, color: Colors[colorScheme].inputText}}
                key = {5}
                onChangeText={handleChange('max')}
                onBlur={handleBlur('max')}
                value={values.max}
                />
              </View>
              {errors.min &&
                  <Text style={{ fontSize: 15, color: Colors[colorScheme].tint }}>{errors.min}</Text>}
                {errors.max &&
                  <Text style={{ fontSize: 15, color: Colors[colorScheme].tint }}>{errors.max}</Text> }
              </View>
              ]}
              <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 20}}>
              <Text style={[styles.time,  {paddingBottom: 12, paddingLeft: 10}]}>Add Notification:</Text>
               <Switch
                style={[styles.time, ]}
                trackColor={{true: '#3a5140', false: 'grey'}}
                thumbColor={values.switch ? '#f1f2f3' : '#f4f3f4'}
                value = {values.switch}
                onValueChange={(value) => setFieldValue('switch', value)}
              />
              </View>
              {values.switch == true && [
              <View style ={styles.select}>
                  <Button
                  title = 'Select Time'
                  color={Colors[colorScheme].tabIconDefault}
                  onPress={() => showMode('time')} />
                <Text
                style = {styles.text}>{text}</Text>
              </View>
              ]}
              {
                show && (
                  <DateTimePicker
                  testID='dateTimePicker'
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display='spinner'
                  onChange={onChange}
                />)}

        <Button
        onPress={handleSubmit}
        title="Submit"
        color={Colors[colorScheme].tabIconDefault}
        />
       {/*} <Text>{JSON.stringify(values, 0, 2)}</Text>*/}
        </View>
        )}
      </Formik>
      </ScrollView>
      <EditScreenInfo path="/screens/AddScreen.tsx" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  item: {
    margin: 3,
    width: 150,
    alignItems: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: {
    backgroundColor: "#3a5140",
    justifyContent:'center',
  },
  time: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  select: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  text: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 20,
  }
});