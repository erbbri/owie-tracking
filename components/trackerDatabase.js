import React, { useState } from 'react'

import * as SQLite from "expo-sqlite"
import { State } from 'react-native-gesture-handler';

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
const insertTracker = (trackerName, trackerType, sliderMin, sliderMax, notifID, done, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into trackers (name, type, slidermin, slidermax, notifid, done) values (?,?,?,?,?,?)', [trackerName, trackerType, sliderMin, sliderMax, notifID, done] );
    },
    (t, error) => { console.log("db error insertTracker"); console.log(error);},
    //if inserting is a success, run function (for refreshTrackers in context)
    (t, success) => { successFunc() }
  )
}

//delete tracker
const deleteTracker = (trackerID) => {
  db.transaction( tx => {
      tx.executeSql( 'delete from trackers where id = (?)', [trackerID] );
    },
    (t, error) => { console.log("db error deleteTracker"); console.log(error);},
    //if inserting is a success, run function (for refreshTrackers in context)
    (t, success) => { console.log("deleted tracker") }
  )
}

//edit tracker name
const editTrackerName = (newName, trackerID) => {
  db.transaction ( tx=> {
    tx.executeSql('update trackers set name = (?) where id = (?)', [newName, trackerID] );
  },
  (t, error) => { console.log("db error editTracker"); console.log(error);},
  //if inserting is a success, run function (for refreshTrackers in context)
  (t, success) => { console.log("changed tracker name") }
  )
}

//edit notifid
const editNotifID = (notifID, trackerID) => {
  db.transaction ( tx=> {
    tx.executeSql('update trackers set notifid = (?) where id = (?)', [notifID, trackerID] );
  },
  (t, error) => { console.log("db error edit notifid"); console.log(error);},
  //if inserting is a success, run function (for refreshTrackers in context)
  (t, success) => { console.log("changed tracker notifid") }
  )
}

//edit done
const editDone = (done, trackerID) => {
  db.transaction ( tx=> {
    tx.executeSql('update trackers set done = (?) where id = (?)', [done, trackerID] );
  },
  (t, error) => { console.log("db error edit done"); console.log(error);},
  //if inserting is a success, run function (for refreshTrackers in context)
  (t, success) => { console.log("changed tracker done") }
  )
}

//reset day
const resetDay = () => {
  db.transaction ( tx=> {
    tx.executeSql('update trackers set done = (?) where done = (?)', [0, 1] );
  },
  (t, error) => { console.log("db error reset trackers"); console.log(error);},
  //if inserting is a success, run function (for refreshTrackers in context)
  (t, success) => { console.log("reset trackers") }
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
          'create table if not exists trackers (id integer primary key not null, name text, type text, slidermin integer, slidermax integer, notifid text, done integer);'
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
        tx.executeSql( 'insert into trackers (id, name, type, slidermin, slidermax, notifid, done) values (?,?,?,?,?,?,?)', [1, "Eat breakfast", "checkbox", 0, 10,'', 0] );
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
  editNotifID,
  editDone,
  resetDay,
}
