/* Главный экран приложения.
Здесь происходит загрузка списка списков покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список списков покупок).
* */

import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AddButton} from '../../components/common/AddButton';
import {EmptyMainScreen} from '../../components/main-screen/EmptyMainScreen';
import {ListOfShoppingLists} from '../../components/main-screen/ListOfShoppingLists';
import {
  loadAllShoppingLists,
  loadShoppingList,
} from '../../store/actions/shoppingListActions';

const MainScreen = ({navigation}) => {
  const {navigate} = navigation;

  const dispatch = useDispatch();

  const shoppingListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.loading,
  );
  const shoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.data,
  );
  shoppingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);

  const listItemPressHandler = listItemId => {
    dispatch(loadShoppingList(listItemId));
    navigate('ShoppingList');
  };

  useEffect(() => {
    dispatch(loadAllShoppingLists());
  }, [dispatch]);

  const loadingComponent = (
    <View style={styles.mainContainer}>
      <Text>Loading...</Text>
    </View>
  );

  const emptyMainScreenComponent = (
    <View style={styles.emptyMainScreenContent}>
      <EmptyMainScreen />
    </View>
  );

  const listOfShoppingListsComponent = (
    <View style={styles.listOfShoppingListContainer}>
      <ListOfShoppingLists
        list={shoppingLists}
        onItemPress={listItemPressHandler}
      />
    </View>
  );

  const mainScreenContent = shoppingListsLoading
    ? loadingComponent
    : shoppingLists.length > 0
    ? listOfShoppingListsComponent
    : emptyMainScreenComponent;

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
  headerTitle: 'Списки покупок',
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
