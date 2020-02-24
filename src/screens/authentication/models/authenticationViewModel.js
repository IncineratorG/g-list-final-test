import {Keyboard} from 'react-native';
import {useState, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {HIDE_INPUT_AREA} from '../../../components/shopping-list-screen/input-area/store/inputAreaActions';

export const useRegistrationScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [mode, setMode] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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

  return {
    data: {
      mode,
      email,
      password,
      verifyPassword,
      keyboardVisible,
    },
    setters: {
      setMode,
      setEmail,
      setPassword,
      setVerifyPassword,
    },
    navigation,
    dispatch,
  };
};

// useEffect(() => {
//   const keyboardShowHandler = () => {
//     setKeyboardVisible(true);
//     if (mode === 'signIn') {
//       setSignInLabelVisible(true);
//       setSignUpLabelVisible(false);
//     } else {
//       setSignInLabelVisible(false);
//       setSignUpLabelVisible(true);
//     }
//   };
//   const keyboardHideHandler = () => {
//     setKeyboardVisible(false);
//     setSignInLabelVisible(true);
//     setSignUpLabelVisible(true);
//   };
//
//   Keyboard.addListener('keyboardDidShow', keyboardShowHandler);
//   Keyboard.addListener('keyboardDidHide', keyboardHideHandler);
//
//   return () => {
//     Keyboard.removeListener('keyboardDidShow', keyboardShowHandler);
//     Keyboard.removeListener('keyboardDidHide', keyboardHideHandler);
//   };
// });
