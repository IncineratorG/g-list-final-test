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

  let contacts = useSelector(state => state.collaboration.localCollaborators);
  if (contacts.length) {
    contacts = contacts.filter(contact => contact.id !== 'MAX_VALUE');
    contacts.push({id: 'MAX_VALUE', extra: true, email: '', status: ''});
  }

  const currentShoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(loadCollaborators());
    }, [dispatch]),
  );

  return {
    data: {
      currentShoppingListId,
      currentEmail,
      collaboratorInputAreaVisible,
      contacts,
    },
    setters: {
      setCollaboratorInputAreaVisible,
    },
    navigation,
    dispatch,
  };
};
