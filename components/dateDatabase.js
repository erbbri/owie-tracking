import React from 'react'

import * as SQLite from "expo-sqlite"

//open database called historyDatabase
const db = SQLite.openDatabase('date.db')

const getDate = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'select * from dateTable limit 1',
          [],
          (_, result) => {
            var dateArray; 
            dateArray = result.rows._array
            dateObject = dateArray.pop();
            console.log(dateObject.date);  
            resolve(dateObject.date)
          },
          (_, error) => { console.log("error getting date"); reject(error)
          }
        )
      })
    })
  }

const editDate = (newDate, prevDate) => {
  db.transaction ( tx=> {
    tx.executeSql('update dateTable set date = (?) where date = (?)', [newDate, prevDate] );
  },
  (t, error) => { console.log("db error change date"); console.log(error);},
  //if inserting is a success, run function (for refreshTrackers in context)
  (t, success) => { console.log("changed date successfully") }
  )
}

//add first date
const insertDate = (firstDate) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into dateTable (date) values (?)', [firstDate] );
    },
    (t, error) => { console.log("db error insertFirstDate"); console.log(error);},
    //if inserting is a success, run function (for refreshTrackers in context)
    (t, success) => {console.log("success insert Date") }
  )
}

const dropDateDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table date',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping date table"); reject(error)
        }
      )
    })
  })
}

//set up database if one doesn't already exist
const setupDateDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists dateTable (date text);'
        );
      },
      (_, error) => { console.log("db error creating date table"); console.log(error); reject(error) },
      (_, success) => { console.log("db success creating date table"); resolve(success)}
    )
  })
}

const setupDateAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into dateTable (date) values (?)', ["19-05-2022"] );
      },
      (t, error) => { console.log("db error insert date"); console.log(error); resolve() },
      (t, success) => { console.log("db success insert date"); resolve(success)}
    )
  })
}

export const dateDatabase = {
  getDate,
  insertDate,
  editDate,
  setupDateDatabaseAsync,
  dropDateDatabaseAsync,
  setupDateAsync, 
}