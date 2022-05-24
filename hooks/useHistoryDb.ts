import React, {useEffect} from 'react';

import { historyDatabase } from '../components/historyDb';

//create database if it doesn't exist and set up initial tracker
export default function useHistoryDatabase() {
  const [isHistoryDBLoadingComplete, setHistoryDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        //use for testing
        //await historyDatabase.dropEntriesDatabaseAsync()
        await historyDatabase.setupEntriesDatabaseAsync()
        // use for testing
        //await historyDatabase.setupEntriesAsync()

        setHistoryDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isHistoryDBLoadingComplete;
}