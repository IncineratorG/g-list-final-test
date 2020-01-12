import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ListCreationDialog from '../../components/create-shopping-list-screen/ListCreationDialog';
import {createShoppingList} from '../../store/actions/shoppingListActions';

const CreateShoppingListScreen = ({navigation}) => {
  const {navigate} = navigation;

  const dispatch = useDispatch();

  const [listName, setListName] = useState('');

  const listCreationDialog = (
    <View style={{position: 'absolute'}}>
      <ListCreationDialog
        listName={listName}
        setListName={setListName}
        visible={true}
        onPositiveButton={() => {
          dispatch(
            createShoppingList(listName.length > 0 ? listName : 'Новый список'),
          );
          navigate('ShoppingList');
        }}
        onNegativeButton={() => {
          navigate('Main');
        }}
        onTouchOutside={() => {
          navigate('Main');
        }}
      />
    </View>
  );

  return <View style={styles.mainContainer}>{listCreationDialog}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeef1',
  },
});

export default CreateShoppingListScreen;
