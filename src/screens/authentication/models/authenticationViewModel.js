import {useState, useEffect, useCallback} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {resetSignErrors} from '../../../store/actions/authenticationActions';
import DeviceInfo from 'react-native-device-info';

export const useAuthenticationScreenModel = () => {
  const navigation = useNavigation();
  const destinationScreen = navigation.getParam('destinationScreen');

  const dispatch = useDispatch();

  const validPhoneLength = 12;

  const [mode, setMode] = useState('signIn');
  // const [phone, setPhone] = useState('');
  const [displayPhone, setDisplayPhone] = useState('');
  const [internationalPhone, setInternationalPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const signedIn = useSelector(
    state => state.authentication.currentUser.signedIn,
  );
  const signing = useSelector(
    state => state.authentication.currentUser.loading,
  );
  const errorDescription = useSelector(
    state => state.authentication.currentUser.error.description,
  );

  useEffect(() => {
    if (errorDescription.length > 0) {
      setErrorText(errorDescription);
      setShowError(true);
    } else {
      setErrorText('');
      setShowError(false);
    }
  }, [errorDescription]);

  useEffect(() => {
    if (signedIn) {
      navigation.navigate(destinationScreen);
    }
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(resetSignErrors());
    }, [dispatch]),
  );

  return {
    data: {
      mode,
      // phone,
      displayPhone,
      internationalPhone,
      validPhoneLength,
      email,
      password,
      verifyPassword,
      signing,
      showError,
      errorText,
    },
    setters: {
      setMode,
      // setPhone,
      setDisplayPhone,
      setInternationalPhone,
      setEmail,
      setPassword,
      setVerifyPassword,
      setShowError,
      setErrorText,
    },
    navigation,
    dispatch,
  };
};
