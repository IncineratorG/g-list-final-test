import {useState, useEffect} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {subscribeToListOfShoppingLists} from '../../../store/actions/shoppingListActions';

export const useMainScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [
    removeConfirmationDialogVisible,
    setRemoveConfirmationDialogVisible,
  ] = useState(false);
  const [removeItemName, setRemoveItemName] = useState('');
  const [removeItemId, setRemoveItemId] = useState(-1);
  const [listItemRow, setListItemRow] = useState(null);

  const currentPhone = useSelector(
    state => state.authentication.currentUser.phone,
  );
  const shoppingListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.loading,
  );
  let shoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.data,
  );
  shoppingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);
  shoppingLists.forEach(list => {
    list.editable = list.creator.length <= 0 || list.creator === currentPhone;
  });

  useEffect(() => {
    dispatch(subscribeToListOfShoppingLists());
  }, [dispatch]);

  return {
    data: {
      removeConfirmationDialogVisible,
      removeItemName,
      removeItemId,
      listItemRow,
      shoppingLists,
      shoppingListsLoading,
    },
    setters: {
      setRemoveConfirmationDialogVisible,
      setRemoveItemName,
      setRemoveItemId,
      setListItemRow,
    },
    navigation,
    dispatch,
  };
};
