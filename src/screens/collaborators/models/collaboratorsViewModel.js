import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadCollaborators,
  subscribeToCurrentShoppingListReceivers,
} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenModel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [
    collaboratorInputAreaVisible,
    setCollaboratorInputAreaVisible,
  ] = useState(false);
  const [contacts, setContacts] = useState([]);

  const serviceBusy = useSelector(state => state.collaboration.busy);
  let localCollaborators = useSelector(
    state => state.collaboration.localCollaborators,
  );
  const shoppingListReceivers = useSelector(
    state => state.collaboration.receivers,
  );
  const currentShoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(subscribeToCurrentShoppingListReceivers());
      dispatch(loadCollaborators());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    let contactsList = [...localCollaborators];
    contactsList.sort((c1, c2) => c1.id < c2.id);

    if (contactsList.length) {
      contactsList = contactsList.filter(contact => contact.id !== 'MAX_VALUE');
      contactsList.push({id: 'MAX_VALUE', extra: true, email: '', status: ''});
    }

    contactsList = contactsList.map(contact => {
      if (
        shoppingListReceivers.filter(
          receiverEmail => receiverEmail === contact.email,
        ).length
      ) {
        contact.selected = true;
      } else {
        contact.selected = false;
      }

      return contact;
    });

    setContacts(contactsList);
  }, [localCollaborators, shoppingListReceivers]);

  return {
    data: {
      serviceBusy,
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
