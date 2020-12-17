import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigation from '../navigation/AppNavigation';
import {subscribeToLocalSignInInfo} from '../../../store/actions/authenticationActions';
import NetInfo from '@react-native-community/netinfo';
import {setOnline} from '../../../store/actions/systemActions';
import {Authentication} from '../../../services/authentication/Authentication';
import {Collaboration} from '../../../services/collaboration/Collaboration';
import {Storage} from '../../../services/storage/Storage';
import {AppState, View} from 'react-native';

export default function AppLoader() {
  // const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  // const signedIn = useSelector(
  //   state => state.authentication.currentUser.signedIn,
  // );
  // const phone = useSelector(state => state.authentication.currentUser.phone);
  // const email = useSelector(state => state.authentication.currentUser.email);
  // const password = useSelector(
  //   state => state.authentication.currentUser.password,
  // );

  useEffect(() => {
    const init = async () => {
      console.log('init()');

      // await Authentication.init();
      // await Collaboration.init();
      // await Storage.init();
      setIsReady(true);
    };

    init();
  }, []);

  // useEffect(() => {
  //   const appStateHandler = async nextAppState => {
  //     if (nextAppState === 'active') {
  //       await Authentication.init();
  //       await Collaboration.init();
  //       await Storage.init();
  //       setIsReady(true);
  //     } else if (nextAppState === 'background') {
  //       Storage.off();
  //       Authentication.off();
  //       Collaboration.off();
  //     }
  //   };
  //
  //   AppState.addEventListener('change', appStateHandler);
  //   return () => {
  //     AppState.removeEventListener('change', appStateHandler);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!signedIn) {
  //     dispatch(subscribeToLocalSignInInfo());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signedIn]);

  // useEffect(() => {
  //   console.log('APP_LOADER_EFFECT');
  //   if (email && password) {
  //     console.log('WILL_SIGN_IN');
  //   } else {
  //     console.log('NO_SIGN_IN');
  //   }
  // }, [email, password, phone]);
  //
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     dispatch(setOnline({online: state.isConnected}));
  //   });
  //
  //   return () => {
  //     unsubscribe();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!isReady) {
    return <View style={{backgroundColor: 'black'}} />;
  }

  return <AppNavigation />;
}

// useEffect(() => {
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     Messaging.processMessage(remoteMessage);
//
//     // const data = remoteMessage.data;
//     // const payload = JSON.parse(data.serializedPayload);
//     //
//     // console.log('TYPE: ' + payload.type);
//     //
//     // console.log(
//     //   'PHONE: ' + currentPhone + ' FCM Message Data:',
//     //   JSON.stringify(remoteMessage.data),
//     // );
//   });
//
//   return () => {
//     unsubscribe();
//   };
// }, [currentPhone]);
