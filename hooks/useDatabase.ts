import React, {useEffect} from 'react';

import {trackerDatabase} from '../components/trackerDatabase'

//create database if it doesn't exist and set up initial tracker
export default function useTrackersDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //used for testing
        //await trackerDatabase.dropTrackersDatabaseAsync()
        await trackerDatabase.setupTrackersDatabaseAsync()
        //used for testing
        //await trackerDatabase.setupTrackersAsync()

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []); 

  return isDBLoadingComplete;
}