import { createContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useTrackersDatabase from './hooks/useDatabase';
import useHistoryDatabase from './hooks/useHistoryDb';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  
  const isLoadingComplete = useCachedResources();
  //load database when app is opened
  const isTrackersDBLoadingComplete = useTrackersDatabase();
  const isHistoryDBLoadidngComplete = useHistoryDatabase(); 
  const colorScheme = useColorScheme();

  if (!isLoadingComplete && isTrackersDBLoadingComplete && isHistoryDBLoadidngComplete) {
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
