import {
  CLASSES_TABLE,
  CLASSES_TABLE_CLASS_COLOR,
  CLASSES_TABLE_CLASS_NAME,
} from '../tables-description/classesTableDescription';

export class ClassesTableOperations {
  static addClass(db, className, classColor) {
    const addClassStatement =
      'INSERT INTO ' +
      CLASSES_TABLE +
      ' (' +
      CLASSES_TABLE_CLASS_NAME +
      ', ' +
      CLASSES_TABLE_CLASS_COLOR +
      ') VALUES (?, ?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addClassStatement,
          [className, classColor],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getClasses(db) {
    const getClassesStatement = 'SELECT * FROM ' + CLASSES_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getClassesStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }
}
