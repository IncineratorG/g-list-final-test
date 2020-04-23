import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';

export const useCollaboratorsScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [
    collaboratorInputAreaVisible,
    setCollaboratorInputAreaVisible,
  ] = useState(false);
  const [contacts, setContacts] = useState([]);
  // ===
  // const contactsList = [];
  // contactsList.push({id: 1, email: 'one@one.ru'});
  // contactsList.push({id: 2, email: 'two@two.ru'});
  // contactsList.push({id: 3, email: 'three@three.com'});
  // contactsList.push({id: 4, email: 'alexander.v.dorokhov@yandex.ru'});
  // contactsList.push({id: 5, email: 'one@one.ru'});
  // contactsList.push({id: 6, email: 'two@two.ru'});
  // contactsList.push({id: 7, email: 'three@three.com'});
  // contactsList.push({id: 8, email: 'alexander.v.dorokhov@yandex.ru'});
  // contactsList.push({id: 9, email: 'one@one.ru'});
  // contactsList.push({id: 10, email: 'two@two.ru'});
  // contactsList.push({id: 11, email: 'three@three.com'});
  // contactsList.push({id: 12, email: 'alexander.v.dorokhov@yandex.ru'});
  // contactsList.push({id: 13, email: 'one@one.ru'});
  // contactsList.push({id: 14, email: 'two@two.ru'});
  // contactsList.push({id: 15, email: 'three@three.com'});
  // contactsList.push({id: 16, email: 'alexander.v.dorokhov@yandex.ru'});
  // contactsList.push({id: Number.MAX_SAFE_INTEGER, email: '', extra: true});
  //
  // setContacts(contactsList);
  // ===

  const currentShoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(clearPotentialCollaboratorData());
  //   }, [dispatch]),
  // );

  return {
    data: {
      currentShoppingListId,
      currentEmail,
      collaboratorInputAreaVisible,
      contacts,
    },
    setters: {
      setCollaboratorInputAreaVisible,
      setContacts,
    },
    navigation,
    dispatch,
  };
};
