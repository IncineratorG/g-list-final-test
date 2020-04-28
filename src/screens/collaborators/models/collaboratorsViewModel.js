import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {loadCollaborators} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [
    collaboratorInputAreaVisible,
    setCollaboratorInputAreaVisible,
  ] = useState(false);
  const [contacts, setContacts] = useState([]);

  let localCollaborators = useSelector(
    state => state.collaboration.localCollaborators,
  );
  const currentShoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const shoppingListCreator = useSelector(
    state => state.shoppingList.currentShoppingList.creator,
  );
  const shoppingListReceivers = useSelector(
    state => state.shoppingList.currentShoppingList.receivers,
  );
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(loadCollaborators());
    }, [dispatch]),
  );

  useEffect(() => {
    let listCollaborators = [];
    if (shoppingListCreator && shoppingListReceivers) {
      if (shoppingListCreator !== currentEmail) {
        listCollaborators.push(shoppingListCreator);
      }
      shoppingListReceivers.forEach(receiver => {
        if (receiver !== currentEmail) {
          listCollaborators.push(receiver);
        }
      });
    }

    let contactsList = localCollaborators.slice(0);
    if (contactsList.length) {
      contactsList = contactsList.filter(contact => contact.id !== 'MAX_VALUE');
      contactsList.push({id: 'MAX_VALUE', extra: true, email: '', status: ''});
    }
    contactsList = contactsList.map(contact => {
      if (
        listCollaborators.filter(selectedId => selectedId === contact.email)
          .length
      ) {
        contact.selected = true;
      } else {
        contact.selected = false;
      }

      return contact;
    });

    setContacts(contactsList);
  }, [
    shoppingListCreator,
    shoppingListReceivers,
    localCollaborators,
    currentEmail,
  ]);

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
