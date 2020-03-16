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

  const localLists = [];
  const outgoingLists = [];
  const incomingLists = [];

  shoppingLists.forEach(list => {
    list.editable = list.creator.length <= 0 || list.creator === currentPhone;
    list.outgoing = list.shared && list.editable;
    list.incoming = list.shared && !list.editable;
    list.local = !list.shared;

    if (list.local) {
      localLists.push(list);
    } else if (list.outgoing) {
      outgoingLists.push(list);
    } else if (list.incoming) {
      incomingLists.push(list);
    }
  });

  localLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);
  outgoingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);
  incomingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);

  const sectionsShoppingLists = [];
  if (localLists.length) {
    sectionsShoppingLists.push({title: 'Локальные', data: localLists});
  }
  if (outgoingLists.length) {
    sectionsShoppingLists.push({title: 'Отправленные', data: outgoingLists});
  }
  if (incomingLists.length) {
    sectionsShoppingLists.push({title: 'Полученные', data: incomingLists});
  }

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
      sectionsShoppingLists,
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
