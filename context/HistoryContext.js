import React, { useEffect, createContext, useState } from 'react';
import { historyDatabase } from '../components/historyDb';

export const HistoryContext = createContext({});

export const HistoryContextProvider = props => {
  // Initial values are obtained from the props
  const {
    entries: initialEntries,
    children
  } = props;

  // Use State to store the values of entries
  const [entries, setEntries] = useState(initialEntries);

  //refresh context from database
  useEffect(() => {
    refreshEntries()
  }, [] )

  const addNewEntry = (trackerID, trackerName, trackerType, date, checked, scale, input) => {
    //insert tracker into database and refresh context
    return historyDatabase.insertTracker(trackerID, trackerName, trackerType, date, checked, scale, input, refreshEntries)
  };

  const refreshEntries = () =>  {
    //get trackers and set them in useState trackers
    return historyDatabase.getEntries(setEntries)
  }

  // Make the context object:
  const historyContext = {
    entries,
    addNewEntry
  };

  // pass the value in provider and return
  return <HistoryContext.Provider value={historyContext}>{children}</HistoryContext.Provider>;
};