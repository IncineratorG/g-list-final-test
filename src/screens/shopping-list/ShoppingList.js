import React from 'react';
import {shoppingListScreenStyles} from './styles/ShoppingLIstScreenStyles';
import ShoppingListScreen from './screens/ShoppingListScreen';
import {useShoppingListScreenModel} from './models/ShoppingListScreenModel';
import {useShoppingListScreenController} from './controllers/ShoppingListScreenController';

const ShoppingList = () => {
  const styles = shoppingListScreenStyles;
  const model = useShoppingListScreenModel();
  const controller = useShoppingListScreenController(model);

  return (
    <ShoppingListScreen
      styles={styles}
      model={model.data}
      controller={controller}
    />
  );
};

ShoppingList.navigationOptions = ({navigation}) => {
  const shoppingListName = navigation.getParam('shoppingListName');
  return {
    headerTitle: shoppingListName ? shoppingListName : '',
  };
};

export default ShoppingList;
