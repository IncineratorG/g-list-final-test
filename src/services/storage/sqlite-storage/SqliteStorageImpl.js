// import * as SQLite from 'react-native-sqlite-storage';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase('post.db');

export class SqliteStorageImpl {
  // static init() {
  //     SQLite.openDatabase('glist.db');
  // }

  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
          [],
          resolve,
          (_, error) => reject(error),
        );
      });
    });
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM posts',
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static createPost({text, date, booked, img}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)',
          [text, date, 0, img],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }
}
