import React, {useEffect} from 'react';
import {shoppingListScreenStyles} from './styles/ShoppingLIstScreenStyles';
import ShoppingListScreen from './screens/ShoppingListScreen';
import {useShoppingListScreenModel} from './models/ShoppingListScreenModel';
import {useShoppingListScreenController} from './controllers/ShoppingListScreenController';
import CollaborationButton from '../../components/shopping-list-screen/CollaborationButton';

const ShoppingList = () => {
  const styles = shoppingListScreenStyles;
  const model = useShoppingListScreenModel();
  const controller = useShoppingListScreenController(model);

  const collaborationButton = (
    <CollaborationButton onPress={controller.navigationButtonHandler} />
  );

  useEffect(() => {
    model.navigation.setParams({collaborationButton});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const collaborationButton = navigation.getParam('collaborationButton');

  return {
    headerTitle: shoppingListName ? shoppingListName : '',
    headerRight: () => {
      return collaborationButton;
    },
  };
};

export default ShoppingList;
