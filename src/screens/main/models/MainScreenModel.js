import {useState, useCallback} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {loadAllShoppingLists} from '../../../store/actions/shoppingListActions';

export const useMainScreenModel = () => {
  const navigation = useNavigation();

  const [
    removeConfirmationDialogVisible,
    setRemoveConfirmationDialogVisible,
  ] = useState(false);
  const [removeItemName, setRemoveItemName] = useState('');
  const [removeItemId, setRemoveItemId] = useState(-1);
  const [listItemRow, setListItemRow] = useState(null);

  const dispatch = useDispatch();

  const shoppingListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.loading,
  );
  const shoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.data,
  );
  shoppingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadAllShoppingLists());
    }, [dispatch]),
  );

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
