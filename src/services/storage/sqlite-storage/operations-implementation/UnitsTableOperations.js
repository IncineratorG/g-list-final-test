import {
  UNITS_TABLE,
  UNITS_TABLE_UNIT_NAME,
} from '../tables-description/unitsTableDescription';

export class UnitsTableOperations {
  static addUnit(db, unitName) {
    const addUnitStatement =
      'INSERT INTO ' +
      UNITS_TABLE +
      ' (' +
      UNITS_TABLE_UNIT_NAME +
      ') VALUES (?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addUnitStatement,
          [unitName],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static removeUnit(db, unitName) {
    const removeUnitStatement =
      'DELETE FROM ' +
      UNITS_TABLE +
      ' WHERE ' +
      UNITS_TABLE_UNIT_NAME +
      ' LIKE ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          removeUnitStatement,
          [unitName],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getUnits(db) {
    const getUnitsStatement = 'SELECT * FROM ' + UNITS_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getUnitsStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }
}
