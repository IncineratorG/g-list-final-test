import {useState, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadCollaborators,
  subscribeToCurrentShoppingListReceivers,
} from '../../../store/actions/collaborationActions';
import {Linking} from 'react-native';

export const useCollaboratorsScreenModel = () => {
  const defaultSmsUrl = 'sms:?body=t';
  const defaultWhatsAppUrl = 'whatsapp://send?text=t';

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [
    collaboratorInputAreaVisible,
    setCollaboratorInputAreaVisible,
  ] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [smsAvailable, setSmsAvailable] = useState(true);
  const [whatsAppAvailable, setWahtsAppAvailable] = useState(false);

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
  const currentShoppingList = useSelector(
    state => state.shoppingList.currentShoppingList,
  );
  const classesMap = useSelector(state => state.shoppingList.classesMap);
  const unitsMap = useSelector(state => state.shoppingList.unitsMap);

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

  useEffect(() => {
    const checkWhatsAppAndSms = async () => {
      try {
        const supported = await Linking.canOpenURL(defaultSmsUrl);
        setSmsAvailable(supported);
      } catch (e) {
        console.log('collaborationViewModel: ERROR_CHECKING_SMS_AVAILABILITY');
      }

      try {
        const supported = await Linking.canOpenURL(defaultWhatsAppUrl);
        setWahtsAppAvailable(supported);
      } catch (e) {
        console.log(
          'collaborationViewModel: ERROR_CHECKING_WHATSAPP_AVAILABILITY',
        );
      }
    };

    checkWhatsAppAndSms();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(subscribeToCurrentShoppingListReceivers());
      dispatch(loadCollaborators());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return {
    data: {
      serviceBusy,
      currentShoppingList,
      currentShoppingListId,
      currentEmail,
      collaboratorInputAreaVisible,
      contacts,
      smsAvailable,
      whatsAppAvailable,
      classesMap,
      unitsMap,
    },
    setters: {
      setCollaboratorInputAreaVisible,
      setContacts,
    },
    navigation,
    dispatch,
  };
};
