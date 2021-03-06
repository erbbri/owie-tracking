import React from 'react'

import * as SQLite from "expo-sqlite"

//open database called historyDatabase
const db = SQLite.openDatabase('historyDatabase.db')

//select all from history - setEntryFunc for useState
const getEntries = (setEntriesFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from entries',
        [],
        (_, { rows: { _array } }) => {
          setEntriesFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load entries"); console.log(error) },
    (_t, _success) => { console.log("loaded entries")}
  );
}

//search history - setEntryFunc for useState
const searchForEntries = (searchPhraseArray, setEntriesFunc) => {
  var sql = 'select * from entries where trackerName = (?) '
  if(searchPhraseArray){
  
  if (searchPhraseArray[0] == 0){
    searchPhraseArray.splice(0, 1); 
    var count = searchPhraseArray.length; 
    var i = count; 
    while (i > 0){
      if (i != 1){
        sql += 'or trackerName = (?) '
      }
      i = i-1
    }
  }
  else if (searchPhraseArray[0] == 1){
    searchPhraseArray.splice(0, 1); 
    sql = 'select * from entries where date between (?) and (?) and (trackerName = (?) '
    var count = searchPhraseArray.length; 
    var i = count;
    while (i > 2){
      if (i != 3){
        sql += 'or trackerName = (?) '
      }
      else {
        sql += ')'
      }
      i = i-1
    }
  }
  else {
    sql = 'select * from entries'; 
    }
}
  console.log(sql); 
  db.transaction(
    tx => {
      tx.executeSql(
        sql,
        searchPhraseArray,
        (_, { rows: { _array } }) => {
          setEntriesFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error search entries"); console.log(error) },
    (_t, _success) => { console.log("loaded searched entries")}
  );
}

//add new entry
const insertEntry = (trackerID, trackerName, trackerType, date, checked, scale, input, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into entries (trackerID, trackerName, trackerType, date, checked, scale, input) values (?,?,?,?,?,?,?)', [trackerID, trackerName, trackerType, date, checked, scale, input] );
    },
    (t, error) => { console.log("db error insertEntries"); console.log(error);},
    //if inserting is a success, run function (for refreshTrackers in context)
    (t, success) => { successFunc() }
  )
}

//drop database - i think deletes database??
const dropEntriesDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table entries',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping entries table"); reject(error)
        }
      )
    })
  })
}

//set up database if one doesn't already exist
const setupEntriesDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists entries (id integer primary key not null, trackerID int, trackerName text, trackerType text, date text, checked integer, scale int, input blob);'
        );
      },
      (_, error) => { console.log("db error creating entries tables"); console.log(error); reject(error) },
      (_, success) => { console.log("db success creating entries tables"); resolve(success)}
    )
  })
}

//set up entries
const setupEntriesAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into entries (id, trackerID, trackerName, trackerType, date, checked, scale, input) values (?,?,?,?,?,?,?,?)', [1, 1, "take meds", "checkbox", "2022-12-04", 1, -1, ''] );
      },
      (t, error) => { console.log("db error insertEntry"); console.log(error); resolve() },
      (t, success) => { console.log("db success insertEntry"); resolve(success)}
    )
  })
}

export const historyDatabase = {
  getEntries,
  insertEntry,
  setupEntriesDatabaseAsync,
  setupEntriesAsync,
  dropEntriesDatabaseAsync,
  searchForEntries, 
}