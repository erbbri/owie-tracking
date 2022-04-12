import { createContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useDatabase from './hooks/useDatabase'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  
  const isLoadingComplete = useCachedResources();
  //load database when app is opened
  const isDBLoadingComplete = useDatabase();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete && isDBLoadingComplete) {
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
