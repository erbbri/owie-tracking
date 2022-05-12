import { StyleSheet, SafeAreaView, Platform, StatusBar, Switch} from 'react-native';
import { Button, TextInput } from 'react-native';
import { BottomNavigation, Modal, RadioButton } from 'react-native-paper';
import { Formik, Field } from 'formik';
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



export default function AddScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const trackersContext = useContext(TrackersContext)
  const notificationsContext = useContext(NotificationsContext)

  const { trackers, addNewTracker } = trackersContext;
  const { sendPushNotification, Notification, registerForPushNotificationsAsync, cancelNotification } = notificationsContext; 
  const testMin = 0; 
  const testMax = 10; 
//For Date/Time Picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');


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

  const insertTracker = (name, type, min, max) => {
    addNewTracker(name, type, parseInt(min), parseInt(max)); 
    goBack(); 
  }

  const goBack = () => {

    navigation.navigate('Root', { screen: 'Edit' }); 
    console.log('go back'); 
  }

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
      <Text style={[styles.title, {color: Colors[colorScheme].text}]}>Create New Tracker</Text>
      <Formik
        validationSchema={trackerValidationSchema}
        initialValues={{ name: '', type: '', min: '0', max: '10', switch: false}}
        onSubmit={values => insertTracker(values.name, values.type, values.min, values.max)}
        validateOnMount={true}
      >

        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid}) => (
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
                name="min"
                style = {{fontSize: 20, backgroundColor: Colors[colorScheme].inputBackground, color: Colors[colorScheme].inputText, marginRight: 10}}
                key = {4}
                onChangeText={handleChange('min')}
                onBlur={handleBlur('min')}
                value={values.min}
                />
                <Text style={styles.text}>Max: </Text>
                <TextInput
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
            {/*  <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 20}}>
                <Switch 
                  trackColor={{ false: Colors[colorScheme].switchColorOff, Colors[colorScheme].switchColorOn  }}
                  thumbColor={isEnabled ? Colors[colorScheme].switchThumbOn : Colors[colorScheme].switchThumbOff}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text style={styles.text}>Add Notification</Text>
              </View>
            */}
          
        <Button
        title="Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
        />
        <Button 
        onPress={handleSubmit} 
        disabled={!isValid}
        title="Submit" 
        color={Colors[colorScheme].tabIconDefault}
        />
       {/*} <Text>{JSON.stringify(values, 0, 2)}</Text>*/}
        </View>
        )}
      </Formik>
      <EditScreenInfo path="/screens/AddScreen.tsx" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

  text: {
    fontSize: 20,
  }
});
