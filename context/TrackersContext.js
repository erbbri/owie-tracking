import React, { useEffect, useContext, createContext, useState } from 'react';
import { trackerDatabase } from '../components/trackerDatabase';
import { NotificationsContext } from './NotificationsContext';

export const TrackersContext = createContext({});

export const TrackersContextProvider = props => {
  // Initial values are obtained from the props
  const {
    trackers: initialTrackers,
    children
  } = props;

  // Use State to store the values of trackers
  const [trackers, setTrackers] = useState(initialTrackers);
  const notificationsContext = useContext(NotificationsContext); 

  const { cancelNotification } = notificationsContext; 

  //refresh context from database
  useEffect(() => {
    refreshTrackers()
  }, [] )

  const addNewTracker = (trackerName, trackerType, sliderMin, sliderMax, notifID, done) => {
    //insert tracker into database and refresh context
    return trackerDatabase.insertTracker(trackerName, trackerType, sliderMin, sliderMax, notifID, done, refreshTrackers)
  };

  const removeTracker = async (trackerID, notifID) => {
    //delete tracker and refresh context
    if (notifID != ''){
      await cancelNotification(notifID); 
      console.log("notification cancelled"); 
    }
    return trackerDatabase.deleteTracker(trackerID)
  };

  const editName = (newName, trackerID) => {
    //edit tracker name
    return trackerDatabase.editTrackerName(newName, trackerID)
  }

  const setDone = (done, trackerID) => {
    //edit tracker name
    return trackerDatabase.editDone(done, trackerID)
  }

  const resetAll = () => {
    return trackerDatabase.resetDay(); 
  }

  //edit notifid
  const changeNotifID = (notifID, trackerID) => {
    //edit tracker name
    return trackerDatabase.editNotifID(notifID, trackerID)
  }

  const refreshTrackers = () =>  {
    //get trackers and set them in useState trackers
    return trackerDatabase.getTrackers(setTrackers)
    console.log('trackers refreshed')
  }

  const removeAllTrackers = async () =>{
    trackers.forEach(tracker => {
      if (tracker.notifid != ''){
        cancelNotification(tracker.notifid); 
        console.log("notification cancelled"); 
      }
    });
    trackerDatabase.dropTrackersDatabaseAsync(); 
    trackerDatabase.setupTrackersDatabaseAsync(); 
    refreshTrackers(); 
  }

  // Make the context object:
  const trackersContext = {
    trackers,
    addNewTracker, 
    removeTracker,
    refreshTrackers, 
    editName, 
    changeNotifID,
    removeAllTrackers,
    setDone, 
    resetAll, 
  };

  // pass the value in provider and return
  return <TrackersContext.Provider value={trackersContext}>{children}</TrackersContext.Provider>;
};