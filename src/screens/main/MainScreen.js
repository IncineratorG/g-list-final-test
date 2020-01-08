/* Главный экран приложения.
Здесь происходит загрузка списка списков покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список списков покупок).
* */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AddButton} from '../../components/common/AddButton';
import {EmptyMainScreen} from '../../components/main-screen/EmptyMainScreen';
import {ListOfShoppingLists} from '../../components/list-of-shopping-list/ListOfShoppingLists';
import {loadAllShoppingLists} from '../../store/actions/shoppingListActions';

const MainScreen = ({navigation}) => {
  const {navigate} = navigation;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllShoppingLists());
  }, [dispatch]);

  let shoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists,
  );
  if (!shoppingLists) {
    shoppingLists = [];
  }
  // console.log('MainScreen->SHOPPING_LISTS: ' + shoppingLists.length);

  const emptyMainScreenContent = (
    <View style={styles.emptyMainScreenContent}>
      <EmptyMainScreen />
    </View>
  );

  const listOfShoppingLists = (
    <View style={styles.listOfShoppingListContainer}>
      {/*<ListOfShoppingLists list={shoppingLists} />*/}
    </View>
  );

  let mainScreenContent =
    shoppingLists.length > 0 ? listOfShoppingLists : emptyMainScreenContent;

  return (
    <View style={styles.mainContainer}>
      {mainScreenContent}
      <View
        style={styles.addShoppingListButtonContainer}
        enabled={false}
        behavior={'position'}>
        <AddButton
          style={styles.addShoppingListButton}
          onClick={() => {
            navigate('CreateShoppingList');
          }}
        />
      </View>
    </View>
  );
};

MainScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Мои покупки',
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeef1',
  },
  addShoppingListButton: {},
  addShoppingListButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  emptyMainScreenContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 83,
  },
  listOfShoppingListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
});

export default MainScreen;

// SqliteStorageHelper.insertInitialUnits().then(value => {
//   SqliteStorageHelper.insertInitialClases();
// });

// SqliteStorageImpl_V2.removeProduct(1).then(value => {
//     console.log(value);
// });

// SqliteStorageImpl_V2.addProduct({name: 'Мясо', classId: 1}).then(
//   value => {
//     console.log(value);
//   },
// );

// SqliteStorageImpl_V2.getClasses().then(value => {
//   for (let i = 0; i < value.length; ++i) {
//     console.log(value.item(i));
//   }
// });

// SqliteStorageImpl_V2.getUnits().then(value => {
//   for (let i = 0; i < value.length; ++i) {
//     console.log(value.item(i));
//   }
// });

// SqliteStorageHelper.insertInitialUnits().then(value => {
//   console.log('VALUES_LENGTH: ' + value.length);
//   for (let i = 0; i < value.length; ++i) {
//     console.log(value[i]);
//   }
// });

// SqliteStorageImpl_V2.removeUnit('кг').then(value => {
//   console.log('ROW_AFFECTED: ' + value);
// });

// SqliteStorageImpl_V2.addUnit('кг').then(value => {
//   console.log('KG_ID: ' + value);
// });

// SqliteStorageImpl_V2.init();

// SqliteStorageImpl.init();
//
// let promise = SqliteStorageImpl.getPosts();
// promise.then(rows => {
//   for (let i = 0; i < rows.length; ++i) {
//     console.log(rows.item(i));
//   }
// });

// SqliteStorageImpl.getPosts().then(value => {
//   for (let i = 0; i < value.length; ++i) {
//     console.log(value.item(i));
//   }
// });

// SqliteStorageImpl.createPost({
//   text: 'MyText',
//   booked: 1,
//   img: 'IMAGE_PATH',
// }).then(value => {
//   console.log('INSERT_ID: ' + value);
// });

// Storage.createShoppingList().then(value => {
//   console.log('UUID: ' + value);
//
//   Storage.getShoppingList(value).then(object => {
//     console.log('============');
//     console.log('NAME: ' + object.name);
//     console.log('AGE: ' + object.age);
//     console.log('============');
//   });
// });

// const testList = [
//   // {
//   //   id: '1',
//   //   name: 'Список 1: вечерняя поездка в ашан 31го декабря, когда все',
//   //   completionStatus: 'not-finished',
//   // },
//   // {
//   //   id: '2',
//   //   name:
//   //     'Список 2: пятерочка на тихвинской улице за углом у которой аптека ивановских в которой находится тряпка',
//   //   completionStatus: 'finished',
//   // },
//   // {id: '3', name: 'Список 3', completionStatus: 'not-finished'},
//   // {id: '4', name: 'Список 4', completionStatus: 'not-finished'},
//   // {id: '5', name: 'Список 5', completionStatus: 'not-finished'},
//   // {id: '6', name: 'Список 6', completionStatus: 'not-finished'},
//   // {id: '7', name: 'Список 7', completionStatus: 'not-finished'},
// ];
