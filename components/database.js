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
const insertTracker = (trackerName, trackerType, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into trackers (name, type) values (?,?)', [trackerName, trackerType] );
    },
    (t, error) => { console.log("db error insertTracker"); console.log(error);},
    //if inserting is a success, run function (for refreshTrackers in context)
    (t, success) => { successFunc() }
  )
}

//drop database - i think deletes database??
const dropDatabaseTablesAsync = async () => {
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
const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists trackers (id integer primary key not null, name text, type text);'
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { console.log("db success creating tables"); resolve(success)}
    )
  })
}

//set up trackers
const setupTrackersAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into trackers (id, name, type) values (?,?,?)', [1, "take meds", "checkbox"] );
      },
      (t, error) => { console.log("db error insertTracker"); console.log(error); resolve() },
      (t, success) => { console.log("db success insertTracker"); resolve(success)}
    )
  })
}

export const database = {
  getTrackers,
  insertTracker,
  setupDatabaseAsync,
  setupTrackersAsync,
  dropDatabaseTablesAsync,
}