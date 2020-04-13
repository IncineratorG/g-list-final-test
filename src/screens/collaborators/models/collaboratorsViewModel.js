import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {clearPotentialCollaboratorData} from '../../../store/actions/collaborationActions';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

export const useCollaboratorsScreenModel = () => {
  // ===
  // const [permission, setPermission] = useState('');
  //
  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     const perm = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       {
  //         title: 'Contacts',
  //         message: 'This app would like to view your contacts.',
  //         buttonPositive: 'Please accept bare mortal',
  //       },
  //     );
  //     setPermission(perm);
  //   };
  //
  //   asyncFunc();
  // }, []);
  //
  // if (permission === 'granted') {
  //   Contacts.getAll((err, contacts) => {
  //     if (err !== 'denied') {
  //       contacts.forEach(contact => {
  //         const {
  //           recordID,
  //           familyName,
  //           givenName,
  //           middleName,
  //           phoneNumbers,
  //         } = contact;
  //
  //         console.log(recordID);
  //       });
  //     }
  //   });
  // }
  // ===

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [enteredPhone, setEnteredPhone] = useState('');

  const currentShoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const collaboratorChecking = useSelector(
    state => state.collaboration.potentialCollaborator.checking,
  );
  const collaboratorPhone = useSelector(
    state => state.collaboration.potentialCollaborator.phone,
  );
  const collaboratorExist = useSelector(
    state => state.collaboration.potentialCollaborator.exist,
  );
  const collaboratorCheckError = useSelector(
    state => state.collaboration.potentialCollaborator.error.hasError,
  );
  const collaboratorCheckErrorDescription = useSelector(
    state => state.collaboration.potentialCollaborator.error.description,
  );
  const currentPhone = useSelector(
    state => state.authentication.currentUser.phone,
  );

  if (collaboratorPhone.length > 0) {
    if (collaboratorExist) {
      console.log(collaboratorPhone + ' EXIST');
    } else {
      console.log(collaboratorPhone + ' NOT_EXIST');
    }
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(clearPotentialCollaboratorData());
    }, [dispatch]),
  );

  return {
    data: {
      currentShoppingListId,
      enteredPhone,
      collaboratorChecking,
      collaboratorExist,
      collaboratorCheckError,
      collaboratorCheckErrorDescription,
      currentPhone,
    },
    setters: {
      setEnteredPhone,
    },
    navigation,
    dispatch,
  };
};
