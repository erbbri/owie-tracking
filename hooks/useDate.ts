import React, {useEffect} from 'react';

import { dateDatabase } from '../components/dateDatabase';

//create database if it doesn't exist and set up initial tracker
export default function useDate() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //use for testing
        //await dateDatabase.dropDateDatabaseAsync
        await dateDatabase.setupDateDatabaseAsync()
        await dateDatabase.setupDateAsync()
        
        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []); 

  return isDBLoadingComplete;
}