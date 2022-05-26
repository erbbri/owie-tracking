import React, { useEffect, createContext, useState } from 'react';
import { historyDatabase } from '../components/historyDb';

export const HistoryContext = createContext({});

export const HistoryContextProvider = props => {
  // Initial values are obtained from the props
  const {
    entries: initialEntries,
    filteredEntries: initialFilteredEntries,
    children
  } = props;

  // Use State to store the values of entries
  const [entries, setEntries] = useState(initialEntries);
  const [filteredEntries, setFilteredEntries] = useState(initialFilteredEntries)

  //refresh context from database
  useEffect(() => {
    refreshEntries()
  }, [] )

  useEffect(() => {
    searchEntries()
  }, [] )

  const addNewEntry = (trackerID, trackerName, trackerType, date, checked, scale, input) => {
    //insert entry into database and refresh context
    return historyDatabase.insertEntry(trackerID, trackerName, trackerType, date, checked, scale, input, refreshEntries)
  };

  const refreshEntries = () =>  {
    //get entries and set them in useState entries
    return historyDatabase.getEntries(setEntries)
  }

  //use to search entries
  // add vars that need to be passed 
  const searchEntries = () =>  {
    return historyDatabase.searchForEntries(setFilteredEntries); 
  }

  const removeAllEntries = () =>{
    historyDatabase.dropEntriesDatabaseAsync();
    historyDatabase.setupEntriesDatabaseAsync(); 
    refreshEntries(); 
  }

  // Make the context object:
  const historyContext = {
    entries,
    filteredEntries, 
    searchEntries, 
    addNewEntry, 
    removeAllEntries,
  };

  // pass the value in provider and return
  return <HistoryContext.Provider value={historyContext}>{children}</HistoryContext.Provider>;
};