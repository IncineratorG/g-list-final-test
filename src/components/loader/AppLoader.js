import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigation from '../navigation/AppNavigation';
import {loadLocalSignInInfo} from '../../store/actions/authenticationActions';
import messaging from '@react-native-firebase/messaging';

export default function AppLoader() {
  const dispatch = useDispatch();

  const currentPhone = useSelector(
    state => state.authentication.currentUser.phone,
  );
  const signedIn = useSelector(
    state => state.authentication.currentUser.signedIn,
  );

  useEffect(() => {
    if (!signedIn) {
      dispatch(loadLocalSignInInfo());
    }
  }, [dispatch, signedIn]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'PHONE: ' + currentPhone + ' FCM Message Data:',
        JSON.stringify(remoteMessage.data),
      );
    });

    return () => {
      unsubscribe();
    };
  }, [currentPhone]);

  return <AppNavigation />;
}
