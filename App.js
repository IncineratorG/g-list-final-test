import React from 'react';
import {StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import store from './src/store';
import AppLoader from './src/components/loader/AppLoader';

export default function App() {
  // const [isReady, setIsReady] = useState(false);

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
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(
  //       'Message handled in the FOREGROUND!',
  //       JSON.stringify(remoteMessage.data),
  //     );
  //   });
  //
  //   return unsubscribe;
  // }, []);

  // if (!isReady) {
  //   return <View style={{backgroundColor: 'black'}} />;
  // }

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
