import {Keyboard} from 'react-native';
import {useState, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';

export const useRegistrationScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [mode, setMode] = useState('signIn');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const signingUp = useSelector(
    state => state.collaboration.currentUser.loading,
  );
  const errorDescription = useSelector(
    state => state.collaboration.currentUser.error.description,
  );

  useEffect(() => {
    const keyboardShowHandler = () => {
      setKeyboardVisible(true);
    };

    const keyboardHideHandler = () => {
      setKeyboardVisible(false);
    };

    Keyboard.addListener('keyboardDidShow', keyboardShowHandler);
    Keyboard.addListener('keyboardDidHide', keyboardHideHandler);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardShowHandler);
      Keyboard.removeListener('keyboardDidHide', keyboardHideHandler);
    };
  });

  useEffect(() => {
    if (errorDescription.length > 0) {
      setErrorText(errorDescription);
      setShowError(true);
    } else {
      setErrorText('');
      setShowError(false);
    }
  }, [errorDescription]);

  return {
    data: {
      mode,
      phone,
      email,
      password,
      verifyPassword,
      keyboardVisible,
      signingUp,
      showError,
      errorText,
    },
    setters: {
      setMode,
      setPhone,
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
