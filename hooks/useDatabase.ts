import React, {useEffect} from 'react';

import {trackerDatabase} from '../components/trackerDatabase'

//create database if it doesn't exist and set up initial tracker
export default function useTrackersDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //possibly don't need to drop database
       // await trackerDatabase.dropTrackersDatabaseAsync()
        await trackerDatabase.setupTrackersDatabaseAsync()
        await trackerDatabase.setupTrackersAsync()

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}