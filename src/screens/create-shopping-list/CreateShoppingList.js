import React from 'react';
import {createShoppingListViewStyles} from './styles/createShoppingListViewStyles';
import {useCreateShoppingListScreenModel} from './models/createShoppingListViewModel';
import {useCreateShoppingListScreenController} from './controllers/createShoppingListViewController';
import CreateShoppingListView from './views/CreateShoppingListView';

const CreateShoppingList = () => {
  const styles = createShoppingListViewStyles;
  const model = useCreateShoppingListScreenModel();
  const controller = useCreateShoppingListScreenController(model);

  return (
    <CreateShoppingListView
      styles={styles}
      model={model.data}
      controller={controller}
    />
  );
};

export default CreateShoppingList;
