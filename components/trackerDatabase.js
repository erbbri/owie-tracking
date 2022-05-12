import React from 'react'

import * as SQLite from "expo-sqlite"

//open database called trackerDatabase
const db = SQLite.openDatabase('trackerDatabase.db')

//select all from trackers - setTrackerFunc for useState
const getTrackers = (setTrackerFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from trackers',
        [],
        (_, { rows: { _array } }) => {
          setTrackerFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load trackers"); console.log(error) },
    (_t, _success) => { console.log("loaded trackers")}
  );
}

//add new tracker
const insertTracker = (trackerName, trackerType, sliderMin, sliderMax, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into trackers (name, type, slidermin, slidermax) values (?,?,?,?)', [trackerName, trackerType, sliderMin, sliderMax] );
    },
    (t, error) => { console.log("db error insertTracker"); console.log(error);},
    //if inserting is a success, run function (for refreshTrackers in context)
    (t, success) => { successFunc() }
  )
}

//delete tracker
const deleteTracker = (trackerName) => {
  db.transaction( tx => {
      tx.executeSql( 'delete from trackers where name = (?)', [trackerName] );
    },
    (t, error) => { console.log("db error deleteTracker"); console.log(error);},
    //if inserting is a success, run function (for refreshTrackers in context)
    (t, success) => { console.log("deleted tracker") }
  )
}

//edit tracker name
const editTrackerName = (newName, trackerName) => {
  db.transaction ( tx=> {
    tx.executeSql('update trackers set name = (?) where name = (?)', [newName, trackerName] );
  },
  (t, error) => { console.log("db error editTracker"); console.log(error);},
  //if inserting is a success, run function (for refreshTrackers in context)
  (t, success) => { console.log("changed tracker name") }
  )
}

//edit slider values
const editSliderValues = (newMin, newMax, trackerName) => {
  db.transaction ( tx=> {
    tx.executeSql('update trackers set slidermin = (?) where name = (?)', [newMin, trackerName] );
    tx.executeSql('update trackers set slidermax = (?) where name = (?)', [newMax, trackerName] );
  },
  (t, error) => { console.log("db error editSlider"); console.log(error);},
  //if inserting is a success, run function (for refreshTrackers in context)
  (t, success) => { console.log("changed slider values") }
  )
}

//drop database
const dropTrackersDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table trackers',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping trackers table"); reject(error)
        }
      )
    })
  })
}

//set up database if one doesn't already exist
const setupTrackersDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists trackers (id integer primary key not null, name text, type text, slidermin integer, slidermax integer);'
        );
      },
      (_, error) => { console.log("db error creating tracker tables"); console.log(error); reject(error) },
      (_, success) => { console.log("db success creating tracker tables"); resolve(success)}
    )
  })
}

//set up trackers
const setupTrackersAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into trackers (id, name, type, slidermin, slidermax) values (?,?,?,?,?)', [1, "take meds", "checkbox", 0, 0] );
      },
      (t, error) => { console.log("db error insertTracker"); console.log(error); resolve() },
      (t, success) => { console.log("db success insertTracker"); resolve(success)}
    )
  })
}

export const trackerDatabase = {
  getTrackers,
  insertTracker,
  deleteTracker,
  setupTrackersDatabaseAsync,
  setupTrackersAsync,
  dropTrackersDatabaseAsync,
  editTrackerName,
}
