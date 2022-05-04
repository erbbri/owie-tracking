import { StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import { Button, TextInput } from 'react-native';
import { BottomNavigation, Modal, RadioButton } from 'react-native-paper';
import { Formik, Field } from 'formik';


import EditScreenInfo from '../components/EditScreenInfo';
import React, {useState, useContext} from 'react';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { TrackersContext } from '../context/TrackersContext';


export default function AddScreen({ navigation }) {

  const colorScheme = useColorScheme();
  const trackersContext = useContext(TrackersContext)

  const { trackers, addNewTracker } = trackersContext;
  const testMin = 0; 
  const testMax = 10; 

  const insertTracker = (name, type, min, max) => {
    addNewTracker(name, type, parseInt(min), parseInt(max)); 
    goBack(); 
  }

  const goBack = () => {

    navigation.navigate('Root', { screen: 'Edit' }); 
    console.log('go back'); 
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
      <Text style={[styles.title, {color: Colors[colorScheme].text}]}>Create New Tracker</Text>
      <Formik
        initialValues={{ name: '', type: '', min: '0', max: '0'}}
        onSubmit={values => insertTracker(values.name, values.type, values.min, values.max)}
      >

        {({ handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Text>Tracker Name</Text>
          <TextInput
            style = {{backgroundColor: "Colors[colorScheme].items"}}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <View>
           <RadioButton.Group              
                     onValueChange={handleChange('type')}
                     value={values.type}
                     >
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <RadioButton key={1} value='checkbox'></RadioButton>
                       <Text>Checkbox</Text>
                   </View>
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <RadioButton key={2} value='slider'></RadioButton>
                       <Text>Slider</Text>
                   </View>
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <RadioButton key={3} value='text'></RadioButton>
                       <Text>Text</Text>
                   </View>
               </RadioButton.Group>
               </View>
              {values.type == "slider" && [
              <View>
                <Text>Min: </Text>
                <TextInput
                style = {{backgroundColor: Colors[colorScheme].items}}
                key = {4}
                onChangeText={handleChange('min')}
                onBlur={handleBlur('min')}
                value={values.min}
                />
                <Text>Max: </Text>
                <TextInput
                style = {{backgroundColor: Colors[colorScheme].items}}
                key = {5}
                onChangeText={handleChange('max')}
                onBlur={handleBlur('max')}
                value={values.max}
                />
              </View>
            ]}
        <Button 
        onPress={handleSubmit} 
        title="Submit" 
        color={Colors[colorScheme].tabIconDefault}
        />
        <Text>{JSON.stringify(values, 0, 2)}</Text>
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
