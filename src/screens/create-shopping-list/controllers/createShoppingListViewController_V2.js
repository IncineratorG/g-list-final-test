import {csl_createShoppingList} from '../../../store/actions/currentShoppingListActions';

export const useCreateShoppingListScreenController = model => {
  const createListButtonHandler = () => {
    model.dispatch(
      csl_createShoppingList(
        model.data.listName.length > 0 ? model.data.listName : 'Новый список',
      ),
    );
    model.navigation.navigate('ShoppingList');
  };
  const cancelCreationButtonHandler = () => model.navigation.navigate('Main');
  const touchOutsideHandler = () => model.navigation.navigate('Main');

  const setListName = listName => model.setters.setListName(listName);

  return {
    createListButtonHandler,
    cancelCreationButtonHandler,
    touchOutsideHandler,
    setListName,
  };
};
