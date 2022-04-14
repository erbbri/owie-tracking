import React, { useEffect, createContext, useState } from 'react';
import { trackerDatabase } from '../components/trackerDatabase';

export const TrackersContext = createContext({});

export const TrackersContextProvider = props => {
  // Initial values are obtained from the props
  const {
    trackers: initialTrackers,
    children
  } = props;

  // Use State to store the values of trackers
  const [trackers, setTrackers] = useState(initialTrackers);

  //refresh context from database
  useEffect(() => {
    refreshTrackers()
  }, [] )

  const addNewTracker = (trackerName, trackerType) => {
    //insert tracker into database and refresh context
    return trackerDatabase.insertTracker(trackerName, trackerType, refreshTrackers)
  };

  const refreshTrackers = () =>  {
    //get trackers and set them in useState trackers
    return trackerDatabase.getTrackers(setTrackers)
  }

  // Make the context object:
  const trackersContext = {
    trackers,
    addNewTracker
  };

  // pass the value in provider and return
  return <TrackersContext.Provider value={trackersContext}>{children}</TrackersContext.Provider>;
};