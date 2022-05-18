import React, {useEffect} from 'react';

import {trackerDatabase} from '../components/trackerDatabase'

//create database if it doesn't exist and set up initial tracker
export default function useTrackersDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);
  var day = String(new Date().getDate()).padStart(2, '0'); 
  var month = String(new Date().getMonth() + 1).padStart(2, '0'); 
  var year = new Date().getFullYear(); 
  var date = day + '-' + month + '-' + year; 

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //possibly don't need to drop database
        //await trackerDatabase.dropTrackersDatabaseAsync()
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