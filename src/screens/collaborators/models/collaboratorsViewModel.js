import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {clearPotentialCollaboratorData} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [
    collaboratorInputAreaVisible,
    setCollaboratorInputAreaVisible,
  ] = useState(false);

  const currentShoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const currentEmail = useSelector(
    state => state.authentication.currentUser.email,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(clearPotentialCollaboratorData());
    }, [dispatch]),
  );

  return {
    data: {
      currentShoppingListId,
      currentEmail,
      enteredEmail,
      collaboratorInputAreaVisible,
    },
    setters: {
      setEnteredEmail,
      setCollaboratorInputAreaVisible,
    },
    navigation,
    dispatch,
  };
};
