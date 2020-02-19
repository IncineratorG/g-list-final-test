import React from 'react';
import {createShoppingListScreenStyles} from './styles/CreateShoppingListScreenStyles';
import {useCreateShoppingListScreenModel} from './models/CreateShoppingListScreenModel';
import {useCreateShoppingListScreenController} from './controllers/CreateShoppingListScreenController';
import CreateShoppingListScreen from './screens/CreateShoppingListScreen';

const CreateShoppingList = () => {
  const styles = createShoppingListScreenStyles;
  const model = useCreateShoppingListScreenModel();
  const controller = useCreateShoppingListScreenController(model);

  return (
    <CreateShoppingListScreen
      styles={styles}
      model={model.data}
      controller={controller}
    />
  );
};

export default CreateShoppingList;
