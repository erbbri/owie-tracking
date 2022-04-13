import React, {useEffect} from 'react';

import {database} from '../components/database'

//create database if it doesn't exist and set up initial tracker
export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //possibly don't need to drop database
        await database.dropDatabaseTablesAsync()
        await database.setupDatabaseAsync()
        await database.setupTrackersAsync()

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}