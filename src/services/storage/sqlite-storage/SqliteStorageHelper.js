import {SqliteStorageImpl_V2} from './SqliteStorageImpl_V2';

export class SqliteStorageHelper {
  static insertInitialUnits() {
    const units = ['кг', 'г', 'л', 'мл', 'шт', 'уп'];

    return new Promise(async (resolve, reject) => {
      let insertedIds = [];
      for (let i = 0; i < units.length; ++i) {
        const insertedId = await SqliteStorageImpl_V2.addUnit(units[i]);
        insertedIds.push(insertedId);
      }

      resolve(insertedIds);
    });
  }

  static insertInitialClases() {
    const classes = [
      'Продукты',
      'Игрушки',
      'Товары для дома',
      'Мебель',
      'Авто',
      'Бытовая техника',
      'Электроника',
      'Спорт и отдых',
      'Хозтовары',
      'Красота и здоровье',
      'Одежда и обувь',
      'Дача и сад',
      'Ремонт',
      'Зоотовары',
      'Канцтовары',
      'Книги',
      'Досуг и хобби',
      'Другое',
    ];

    return new Promise(async (resolve, reject) => {
      let insertedIds = [];
      for (let i = 0; i < classes.length; ++i) {
        const Id = await SqliteStorageImpl_V2.addClass(classes[i]);
        insertedIds.push(Id);
      }

      resolve(insertedIds);
    });
  }
}
