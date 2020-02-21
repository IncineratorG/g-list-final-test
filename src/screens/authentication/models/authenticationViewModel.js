import {Keyboard} from 'react-native';
import {useState, useEffect} from 'react';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';

export const useRegistrationScreenModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const activeLabelColor = '#4a9dec';
  const nonActiveLabelColor = 'lightgrey';

  const [mode, setMode] = useState('signIn');

  return {
    data: {
      mode,
      activeLabelColor,
      nonActiveLabelColor,
    },
    setters: {
      setMode,
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
