import { StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import { Button, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik } from 'formik';


import EditScreenInfo from '../components/EditScreenInfo';
import React, {useState, useContext} from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { TrackersContext } from '../context/TrackersContext';


export default function AddScreen() {

  const colorScheme = useColorScheme();
  const trackersContext = useContext(TrackersContext)

  const { trackers, addNewTracker } = trackersContext;

  const insertTracker = (name, type) => {
    addNewTracker(name, type)
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
      <Text style={[styles.title, {color: Colors[colorScheme].text}]}>Create New Tracker</Text>
      <Formik
        initialValues={{ name: '', type: '' }}
        onSubmit={values => addNewTracker(values.name, values.type)}
      >

        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
           <RadioButton.Group
                     onValueChange={handleChange('type')}
                     value={values.type}
                     >
                   <View>
                       <Text>Checkbox</Text>
                       <RadioButton value='checkbox'></RadioButton>
                   </View>
                   <View>
                       <Text>Slider</Text>
                       <RadioButton value='slider'></RadioButton>
                   </View>
                   <View>
                       <Text>Text</Text>
                       <RadioButton value='text'></RadioButton>
                   </View>
               </RadioButton.Group>
        <Button onPress={handleSubmit} title="Submit" />
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

  form: {
    
  }
});
