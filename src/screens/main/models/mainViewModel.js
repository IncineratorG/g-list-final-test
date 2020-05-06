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

  // const currentId = useSelector(state => state.authentication.currentUser.id);
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );
  const localListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.localListsLoading,
  );
  const sharedListsLoading = useSelector(
    state => state.shoppingList.allShoppingLists.sharedListsLoading,
  );
  const localShoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.localLists,
  );
  const sharedShoppingLists = useSelector(
    state => state.shoppingList.allShoppingLists.sharedLists,
  );

  const localListsTitle = 'Локальные списки';
  const sharedListsTitle = 'Совместные списки';

  const sectionsShoppingLists = [
    {title: localListsTitle, data: localShoppingLists},
    {title: sharedListsTitle, data: sharedShoppingLists},
  ];
  if (localShoppingLists.length || sharedShoppingLists.length) {
    sectionsShoppingLists.push({
      title: '',
      data: [{id: 'MAX_VALUE', extra: true}],
    });
  }

  useEffect(() => {
    const allLists = 'Все';
    const localLists = 'Локальные';
    const sharedLists = 'Совместные';
    const listTypesArr = [{type: ListTypes.type.ALL, title: allLists}];
    if (localShoppingLists.length) {
      listTypesArr.push({type: ListTypes.type.LOCAL, title: localLists});
    }
    if (sharedShoppingLists.length) {
      listTypesArr.push({type: ListTypes.type.SHARED, title: sharedLists});
    }
    setListTypes(listTypesArr);
  }, [localShoppingLists, sharedShoppingLists]);

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
      sectionsShoppingLists,
      listTypes,
      selectedListType,
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
