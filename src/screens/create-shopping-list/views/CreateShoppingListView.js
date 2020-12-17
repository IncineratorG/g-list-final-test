import React from 'react';
import {View} from 'react-native';
import ListCreationDialog from '../../../components/specific/create-shopping-list-screen/ListCreationDialog';

const CreateShoppingListView = ({styles, model, controller}) => {
  const {listName} = model;

  const {
    createListButtonHandler,
    cancelCreationButtonHandler,
    touchOutsideHandler,
    setListName,
  } = controller;

  const listCreationDialog = (
    <View style={{position: 'absolute'}}>
      <ListCreationDialog
        listName={listName}
        setListName={setListName}
        visible={true}
        onPositiveButton={createListButtonHandler}
        onNegativeButton={cancelCreationButtonHandler}
        onTouchOutside={touchOutsideHandler}
      />
    </View>
  );

  return <View style={styles.mainContainer}>{listCreationDialog}</View>;
};

export default CreateShoppingListView;
