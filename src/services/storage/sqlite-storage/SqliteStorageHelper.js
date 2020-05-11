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
      {name: 'Другое', color: '#c0c0c0'},
      {name: 'Продукты', color: '#ff8000'},
      {name: 'Игрушки', color: '#9900cc'},
      {name: 'Товары для дома', color: '#ffff00'},
      {name: 'Мебель', color: '#663300'},
      {name: 'Авто', color: '#3399ff'},
      {name: 'Бытовая техника', color: '#99ccff'},
      {name: 'Электроника', color: '#0073e6'},
      {name: 'Спорт и отдых', color: '#ffccff'},
      {name: 'Хозтовары', color: '#333300'},
      {name: 'Красота и здоровье', color: '#ff0066'},
      {name: 'Одежда и обувь', color: '#660033'},
      {name: 'Дача и сад', color: '#00cc66'},
      {name: 'Ремонт', color: '#476b6b'},
      {name: 'Зоотовары', color: '#ffffcc'},
      {name: 'Канцтовары', color: '#339966'},
      {name: 'Книги', color: '#993300'},
      {name: 'Досуг и хобби', color: '#99d6ff'},
    ];

    return new Promise(async (resolve, reject) => {
      let insertedIds = [];
      for (let i = 0; i < classes.length; ++i) {
        const Id = await SqliteStorage.addClass({
          className: classes[i].name,
          classColor: classes[i].color,
        });
        insertedIds.push(Id);
      }

      resolve(insertedIds);
    });
  }

  // static insertInitialClasses() {
  //   const classes = [
  //     'Другое',
  //     'Продукты',
  //     'Игрушки',
  //     'Товары для дома',
  //     'Мебель',
  //     'Авто',
  //     'Бытовая техника',
  //     'Электроника',
  //     'Спорт и отдых',
  //     'Хозтовары',
  //     'Красота и здоровье',
  //     'Одежда и обувь',
  //     'Дача и сад',
  //     'Ремонт',
  //     'Зоотовары',
  //     'Канцтовары',
  //     'Книги',
  //     'Досуг и хобби',
  //   ];
  //
  //   return new Promise(async (resolve, reject) => {
  //     let insertedIds = [];
  //     for (let i = 0; i < classes.length; ++i) {
  //       const Id = await SqliteStorage.addClass(classes[i]);
  //       insertedIds.push(Id);
  //     }
  //
  //     resolve(insertedIds);
  //   });
  // }
}
