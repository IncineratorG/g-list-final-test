import {useState, useEffect, useCallback} from 'react';
import {useNavigation, useFocusEffect} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {subscribeToListOfShoppingLists} from '../../../store/actions/shoppingListActions';
import {ListTypes} from '../../../components/main-screen/ListTypes';

export const useMainScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [
    removeConfirmationDialogVisible,
    setRemoveConfirmationDialogVisible,
  ] = useState(false);
  const [removeItemName, setRemoveItemName] = useState('');
  const [removeItemId, setRemoveItemId] = useState(-1);
  const [listTypes, setListTypes] = useState([]);
  const [selectedListType, setSelectedListType] = useState(ListTypes.type.ALL);
  const [selectedShoppingLists, setSelectedShoppingLists] = useState([]);
  const [listProcessed, setListProcessed] = useState(false);
  const [busy, setBusy] = useState(true);

  const signedIn = useSelector(
    state => state.authentication.currentUser.signedIn,
  );
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );
  const localListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.localListsLoading,
  );
  const sharedListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.sharedListsLoading,
  );
  const allShoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.allLists,
  );
  const localShoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.localLists,
  );
  const sharedShoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.sharedLists,
  );
  const sharedShoppingListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.sharedListsLoading,
  );

  useEffect(() => {
    const allListsTypeTitle = 'Все';
    const localListsTypeTitle = 'Локальные';
    const sharedListsTypeTitle = 'Совместные';
    const listTypesArr = [];
    if (localShoppingLists.length && sharedShoppingLists.length) {
      listTypesArr.push({type: ListTypes.type.ALL, title: allListsTypeTitle});
    }
    if (localShoppingLists.length && sharedShoppingLists.length) {
      listTypesArr.push({
        type: ListTypes.type.LOCAL,
        title: localListsTypeTitle,
      });
    }
    if (sharedShoppingLists.length) {
      listTypesArr.push({
        type: ListTypes.type.SHARED,
        title: sharedListsTypeTitle,
      });
    }
    setListTypes(listTypesArr);
  }, [localShoppingLists, sharedShoppingLists]);

  useEffect(() => {
    setListProcessed(false);
    if (selectedListType === ListTypes.type.ALL) {
      if (allShoppingLists.length) {
        setSelectedShoppingLists([
          ...allShoppingLists,
          {id: 'MAX_VALUE', extra: true},
        ]);
      } else {
        setSelectedShoppingLists(allShoppingLists);
      }
    } else if (selectedListType === ListTypes.type.LOCAL) {
      if (localShoppingLists.length) {
        setSelectedShoppingLists([
          ...localShoppingLists,
          {id: 'MAX_VALUE', extra: true},
        ]);
      } else {
        setSelectedShoppingLists(localShoppingLists);
      }
    } else if (selectedListType === ListTypes.type.SHARED) {
      if (sharedShoppingLists.length) {
        setSelectedShoppingLists([
          ...sharedShoppingLists,
          {id: 'MAX_VALUE', extra: true},
        ]);
      } else {
        setSelectedShoppingLists(sharedShoppingLists);
      }
    }
    setListProcessed(true);
  }, [
    localShoppingLists,
    sharedShoppingLists,
    selectedListType,
    allShoppingLists,
  ]);

  useEffect(() => {
    if (!sharedShoppingListsLoading && listProcessed) {
      setBusy(false);
    } else {
      setBusy(true);
    }
  }, [sharedShoppingListsLoading, listProcessed]);

  useFocusEffect(
    useCallback(() => {
      dispatch(subscribeToListOfShoppingLists());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return {
    data: {
      removeConfirmationDialogVisible,
      removeItemName,
      removeItemId,
      currentEmail,
      localListsLoading,
      sharedListsLoading,
      listTypes,
      selectedListType,
      selectedShoppingLists,
      busy,
      signedIn,
    },
    setters: {
      setRemoveConfirmationDialogVisible,
      setRemoveItemName,
      setRemoveItemId,
      setSelectedListType,
    },
    navigation,
    dispatch,
  };
};
// export const useMainScreenModel = () => {
//   const navigation = useNavigation();
//
//   const dispatch = useDispatch();
//
//   const [
//     removeConfirmationDialogVisible,
//     setRemoveConfirmationDialogVisible,
//   ] = useState(false);
//   const [removeItemName, setRemoveItemName] = useState('');
//   const [removeItemId, setRemoveItemId] = useState(-1);
//   const [sharedListsLoading, setSharedListsLoading] = useState(false);
//
//   const currentId = useSelector(state => state.authentication.currentUser.id);
//   const currentEmail = useSelector(
//     state => state.authentication.currentUser.email,
//   );
//   const shoppingListsLoading = useSelector(
//     state => state.shoppingList.allShoppingLists.loading,
//   );
//   const sendListsLoading = useSelector(
//     state => state.shoppingList.allShoppingLists.sendListsLoading,
//   );
//   const receivedListsLoading = useSelector(
//     state => state.shoppingList.allShoppingLists.receivedListsLoading,
//   );
//   let shoppingLists = useSelector(
//     state => state.shoppingList.allShoppingLists.data,
//   );
//
//   const localLists = [];
//   const outgoingLists = [];
//   const incomingLists = [];
//
//   shoppingLists.forEach(list => {
//     list.editable = list.creator.length <= 0 || list.creator === currentId;
//     list.outgoing = list.shared && list.editable;
//     list.incoming = list.shared && !list.editable;
//     list.local = !list.shared;
//
//     if (list.local) {
//       localLists.push(list);
//     } else if (list.outgoing) {
//       outgoingLists.push(list);
//     } else if (list.incoming) {
//       incomingLists.push(list);
//     }
//   });
//
//   localLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);
//   outgoingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);
//   incomingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);
//
//   const sectionsShoppingLists = [];
//   if (localLists.length) {
//     sectionsShoppingLists.push({title: 'Локальные', data: localLists});
//   }
//   if (outgoingLists.length) {
//     sectionsShoppingLists.push({title: 'Отправленные', data: outgoingLists});
//   }
//   if (incomingLists.length) {
//     sectionsShoppingLists.push({title: 'Полученные', data: incomingLists});
//   }
//   if (sectionsShoppingLists.length > 0) {
//     sectionsShoppingLists.push({
//       title: '',
//       data: [{id: 'MAX_VALUE', extra: true}],
//     });
//   }
//
//   // ===
//   const sectionFreeShoppingList = [];
//   sectionsShoppingLists.forEach(section =>
//     sectionFreeShoppingList.push(...section.data),
//   );
//
//   sectionFreeShoppingList.forEach(list => {
//     const {creator, receivers} = list;
//
//     let listCollaborators = [];
//     if (creator && receivers) {
//       if (creator !== currentEmail) {
//         listCollaborators.push(creator);
//       }
//       receivers.forEach(receiver => {
//         if (receiver !== currentEmail) {
//           listCollaborators.push(receiver);
//         }
//       });
//     }
//
//     list.collaborators = listCollaborators;
//   });
//   // ===
//
//   useFocusEffect(
//     useCallback(() => {
//       dispatch(subscribeToListOfShoppingLists());
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []),
//   );
//
//   useEffect(() => {
//     if (sendListsLoading || receivedListsLoading) {
//       setSharedListsLoading(true);
//     } else {
//       setSharedListsLoading(false);
//     }
//   }, [sendListsLoading, receivedListsLoading]);
//
//   return {
//     data: {
//       removeConfirmationDialogVisible,
//       removeItemName,
//       removeItemId,
//       shoppingLists,
//       sectionsShoppingLists,
//       sectionFreeShoppingList,
//       shoppingListsLoading,
//       sharedListsLoading,
//     },
//     setters: {
//       setRemoveConfirmationDialogVisible,
//       setRemoveItemName,
//       setRemoveItemId,
//     },
//     navigation,
//     dispatch,
//   };
// };
