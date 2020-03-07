import {useState} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';

export const useCreateShoppingListScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [listName, setListName] = useState('');

  return {
    data: {listName},
    setters: {setListName},
    navigation,
    dispatch,
  };
};
