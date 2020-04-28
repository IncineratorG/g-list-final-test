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

  const currentId = useSelector(state => state.authentication.currentUser.id);
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
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
    list.editable = list.creator.length <= 0 || list.creator === currentId;
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
  if (sectionsShoppingLists.length > 0) {
    sectionsShoppingLists.push({
      title: '',
      data: [{id: 'MAX_VALUE', extra: true}],
    });
  }

  // ===
  const sectionFreeShoppingList = [];
  sectionsShoppingLists.forEach(section =>
    sectionFreeShoppingList.push(...section.data),
  );

  sectionFreeShoppingList.forEach(list => {
    const {creator, receivers} = list;

    let listCollaborators = [];
    if (creator && receivers) {
      if (creator !== currentEmail) {
        listCollaborators.push(creator);
      }
      receivers.forEach(receiver => {
        if (receiver !== currentEmail) {
          listCollaborators.push(receiver);
        }
      });
    }

    list.collaborators = listCollaborators;
  });
  // ===

  useEffect(() => {
    dispatch(subscribeToListOfShoppingLists());
  }, [dispatch]);

  return {
    data: {
      removeConfirmationDialogVisible,
      removeItemName,
      removeItemId,
      shoppingLists,
      sectionsShoppingLists,
      sectionFreeShoppingList,
      shoppingListsLoading,
    },
    setters: {
      setRemoveConfirmationDialogVisible,
      setRemoveItemName,
      setRemoveItemId,
    },
    navigation,
    dispatch,
  };
};
