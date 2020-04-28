import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearSelectedCollaborators,
  loadCollaborators,
} from '../../../store/actions/collaborationActions';

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
  let selectedCollaborators = useSelector(
    state => state.collaboration.selectedCollaboratorsIds,
  );
  const currentShoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(clearSelectedCollaborators());
      dispatch(loadCollaborators());
    }, [dispatch]),
  );

  useEffect(() => {
    // let contactsList = localCollaborators.slice(0);
    // if (contactsList.length) {
    //   contactsList = contactsList.filter(contact => contact.id !== 'MAX_VALUE');
    //   contactsList.push({id: 'MAX_VALUE', extra: true, email: '', status: ''});
    // }
    // contactsList = contactsList.map(contact => {
    //   contact.selected = false;
    //   return contact;
    // });

    let contactsList = localCollaborators.slice(0);
    if (contactsList.length) {
      contactsList = contactsList.filter(contact => contact.id !== 'MAX_VALUE');
      contactsList.push({id: 'MAX_VALUE', extra: true, email: '', status: ''});
    }
    contactsList = contactsList.map(contact => {
      if (
        selectedCollaborators.filter(selectedId => selectedId === contact.id)
          .length
      ) {
        contact.selected = true;
      } else {
        contact.selected = false;
      }

      return contact;
    });

    setContacts(contactsList);
  }, [localCollaborators, selectedCollaborators]);

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
