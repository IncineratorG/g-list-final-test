import React, {useState, useEffect} from 'react';
import {View, AppState, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppLoader from './src/components/loader/AppLoader';
import {Storage} from './src/services/storage/Storage';
import {Authentication} from './src/services/authentication/Authentication';
import {Collaboration} from './src/services/collaboration/Collaboration';
import {MenuProvider} from 'react-native-popup-menu';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const appStateHandler = async nextAppState => {
      if (nextAppState === 'active') {
        await Authentication.init();
        await Collaboration.init();
        await Storage.init();
        setIsReady(true);
      } else if (nextAppState === 'background') {
        Storage.off();
        Authentication.off();
        Collaboration.off();
      }
    };

    AppState.addEventListener('change', appStateHandler);
    return () => {
      AppState.removeEventListener('change', appStateHandler);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'Message handled in the FOREGROUND!',
        JSON.stringify(remoteMessage.data),
      );
    });

    return unsubscribe;
  }, []);

  if (!isReady) {
    return <View style={{backgroundColor: 'black'}} />;
  }

  return (
    <MenuProvider>
      <Provider store={store}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content" // Here is where you change the font-color
        />
        <AppLoader />
      </Provider>
    </MenuProvider>
  );
}
