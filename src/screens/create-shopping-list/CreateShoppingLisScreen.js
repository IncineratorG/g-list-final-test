import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ListCreationDialog from '../../components/create-shopping-list-screen/ListCreationDialog';

const CreateShoppingListScreen = ({navigation}) => {
  const {navigate} = navigation;

  const dispatch = useDispatch();

  const listCreationDialog = (
    <View style={{position: 'absolute'}}>
      <ListCreationDialog
        visible={true}
        onPositiveButton={() => {
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
