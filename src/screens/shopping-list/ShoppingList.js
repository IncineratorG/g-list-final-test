import React, {useEffect} from 'react';
import {shoppingLIstViewStyles} from './styles/shoppingLIstViewStyles';
import ShoppingListView from './views/ShoppingListView';
import {useShoppingListScreenModel} from './models/shoppingListViewModel_V2';
import {useShoppingListScreenController} from './controllers/shoppingListViewController_V2';
import CollaborationButton from '../../components/shopping-list-screen/CollaborationButton';

const ShoppingList = () => {
  const styles = shoppingLIstViewStyles;
  const model = useShoppingListScreenModel();
  const controller = useShoppingListScreenController(model);

  useEffect(() => {
    model.navigation.setParams({controller});
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
  const editable = navigation.getParam('editable');
  const controller = navigation.getParam('controller');
  const online = navigation.getParam('online');

  const collaborationButton =
    editable && online ? (
      <CollaborationButton onPress={controller.navigationButtonHandler} />
    ) : null;

  return {
    headerTitle: shoppingListName ? shoppingListName : '',
    headerRight: () => {
      return collaborationButton;
    },
  };
};

export default ShoppingList;
