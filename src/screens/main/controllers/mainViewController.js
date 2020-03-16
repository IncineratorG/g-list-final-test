import {
  removeShoppingList,
  subscribeToShoppingList,
} from '../../../store/actions/shoppingListActions';

export const useMainScreenController = model => {
  const listItemPressHandler = listItemId => {
    model.dispatch(subscribeToShoppingList(listItemId));
    model.navigation.navigate('ShoppingList');
  };

  const listItemRemoveHandler = (listItem, row) => {
    model.setters.setRemoveItemName(listItem.name);
    model.setters.setRemoveItemId(listItem.id);
    model.setters.setListItemRow(row);
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
    model.setters.setListItemRow(null);
  };

  const removeConfirmationDialogCancelRemoveHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
    model.data.listItemRow.closeRow();
    model.setters.setListItemRow(null);
  };

  const menuButtonHandler = () => {
    model.navigation.toggleDrawer();
  };

  return {
    listItemPressHandler,
    listItemRemoveHandler,
    addButtonHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    menuButtonHandler,
  };
};
