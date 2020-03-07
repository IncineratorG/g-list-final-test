import React, {useEffect} from 'react';
import {shoppingLIstViewStyles} from './styles/shoppingLIstViewStyles';
import ShoppingListView from './views/ShoppingListView';
import {useShoppingListScreenModel} from './models/shoppingListViewModel';
import {useShoppingListScreenController} from './controllers/shoppingListViewController';
import CollaborationButton from '../../components/shopping-list-screen/CollaborationButton';

const ShoppingList = () => {
  const styles = shoppingLIstViewStyles;
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
    <ShoppingListView
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
