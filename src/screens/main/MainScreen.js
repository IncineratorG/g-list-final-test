/* Главный экран приложения.
Здесь происходит загрузка списка списков покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список списков покупок).
* */

import React, {useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AddButton} from '../../components/common/AddButton';
import {EmptyMainScreen} from '../../components/main-screen/EmptyMainScreen';
import {ListOfShoppingLists} from '../../components/main-screen/ListOfShoppingLists';
import {loadAllShoppingLists} from '../../store/actions/shoppingListActions';

const MainScreen = ({navigation}) => {
  // console.log('MainScreen');

  const {navigate} = navigation;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllShoppingLists());
  });

  let shoppingLists = useSelector(state => state.shoppingList.allShoppingLists);
  // if (!shoppingLists) {
  //   shoppingLists = [];
  // }

  const shoppingListLoading = (
    <View style={styles.mainContainer}>
      <Text>LOADING</Text>
    </View>
  );

  const emptyMainScreenContent = (
    <View style={styles.emptyMainScreenContent}>
      <EmptyMainScreen />
    </View>
  );

  const listOfShoppingLists = (
    <View style={styles.listOfShoppingListContainer}>
      <ListOfShoppingLists list={shoppingLists} />
    </View>
  );

  // let mainScreenContent =
  //   shoppingLists.length > 0 ? listOfShoppingLists : emptyMainScreenContent;
  let mainScreenContent =
    shoppingLists === false
      ? shoppingListLoading
      : shoppingLists.length > 0
      ? listOfShoppingLists
      : emptyMainScreenContent;

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
