import { createContext, useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useTrackersDatabase from './hooks/useDatabase';
import useHistoryDatabase from './hooks/useHistoryDb';
import useDate from './hooks/useDate';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { dateDatabase } from './components/dateDatabase';
import { trackerDatabase } from './components/trackerDatabase'; 
import { HistoryContext } from './context/HistoryContext';

//function checks if date has changed
//if it has, it changes date saved in database
//and resets trackers to show up for the new day
{/*async function checkDate () {
  var day = String(new Date().getDate()).padStart(2, '0'); 
  var month = String(new Date().getMonth() + 1).padStart(2, '0'); 
  var year = new Date().getFullYear(); 
  var currentDate = day + '-' + month + '-' + year; 

  var onfileDate = await dateDatabase.getDate();  

 if(onfileDate != currentDate){
    trackerDatabase.resetDay(); 
    dateDatabase.editDate(currentDate, onfileDate); 
    console.log( "date changed to: ", currentDate); 
  }
}*/}

export default function App() {
  
  const isLoadingComplete = useCachedResources();
  //load database when app is opened
  const isTrackersDBLoadingComplete = useTrackersDatabase();
  const isHistoryDBLoadingComplete = useHistoryDatabase(); 
  const isDateDBLoadingComplete = useDate(); 
  const colorScheme = useColorScheme();

  if (!isLoadingComplete && !isTrackersDBLoadingComplete && !isHistoryDBLoadingComplete && !isDateDBLoadingComplete) {
    
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
      </SafeAreaProvider>
    );
  }
}


