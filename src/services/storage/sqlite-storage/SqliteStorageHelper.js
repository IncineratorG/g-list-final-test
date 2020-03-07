import {SqliteStorage} from './SqliteStorage';

export class SqliteStorageHelper {
  static insertInitialUnits() {
    const units = ['шт', 'кг', 'г', 'л', 'мл', 'уп'];

    return new Promise(async (resolve, reject) => {
      let insertedIds = [];
      for (let i = 0; i < units.length; ++i) {
        const insertedId = await SqliteStorage.addUnit(units[i]);
        insertedIds.push(insertedId);
      }

      resolve(insertedIds);
    });
  }

  static insertInitialClasses() {
    const classes = [
      'Другое',
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
    ];

    return new Promise(async (resolve, reject) => {
      let insertedIds = [];
      for (let i = 0; i < classes.length; ++i) {
        const Id = await SqliteStorage.addClass(classes[i]);
        insertedIds.push(Id);
      }

      resolve(insertedIds);
    });
  }
}
