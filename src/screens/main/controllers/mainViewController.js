import {
  removeShoppingList,
  subscribeToShoppingList,
  unsubscribeFromListOfShoppingLists,
} from '../../../store/actions/shoppingListActions';

export const useMainScreenController = model => {
  const listItemPressHandler = listItemId => {
    model.dispatch(unsubscribeFromListOfShoppingLists());
    model.dispatch(subscribeToShoppingList(listItemId));
    model.navigation.navigate('ShoppingList');
  };

  const listItemRemoveHandler = listItem => {
    model.setters.setRemoveItemName(listItem.name);
    model.setters.setRemoveItemId(listItem.id);
    model.setters.setRemoveConfirmationDialogVisible(true);
  };

  const addButtonHandler = () => {
    model.navigation.navigate('CreateShoppingList');
  };

  const removeConfirmationDialogTouchOutsideHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
  };

  const removeConfirmationDialogRemoveHandler = () => {
    model.dispatch(removeShoppingList(model.data.removeItemId));
    model.setters.setRemoveConfirmationDialogVisible(false);
  };

  const removeConfirmationDialogCancelRemoveHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
  };

  const menuButtonHandler = () => {
    model.navigation.toggleDrawer();
  };

  const selectListTypeHandler = selectedType => {
    model.setters.setSelectedListType(selectedType);
  };

  const shareListHandler = listId => {
    model.dispatch(unsubscribeFromListOfShoppingLists());
    model.dispatch(subscribeToShoppingList(listId));

    if (model.data.signedIn) {
      model.navigation.navigate('Collaborators');
    } else {
      model.navigation.navigate('Authentication', {
        destinationScreen: 'Collaborators',
      });
    }
  };

  return {
    listItemPressHandler,
    listItemRemoveHandler,
    addButtonHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    menuButtonHandler,
    selectListTypeHandler,
    shareListHandler,
  };
};
