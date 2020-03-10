import React, {useState, useEffect} from 'react';
import {View, AppState} from 'react-native';
import {Provider} from 'react-redux';
import {AppLoading} from './src/components/common/AppLoading';
import Bootstrap from './src/services/bootstrap/Bootstrap';
import store from './src/store';
import AppLoader from './src/components/loader/AppLoader';
import {Storage} from './src/services/storage/Storage';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const appStateHandler = nextAppState => {
      const processState = async appState => {
        if (appState === 'active') {
          await Storage.init();
          setIsReady(true);
        } else if (appState === 'background') {
          Storage.off();
        }
      };

      processState(nextAppState);
    };

    AppState.addEventListener('change', appStateHandler);
    return () => {
      AppState.removeEventListener('change', appStateHandler);
    };
  });

  if (!isReady) {
    return <View style={{backgroundColor: 'black'}} />;
  }

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={Bootstrap.start}
  //       onFinish={() => setIsReady(true)}
  //       onError={err => console.log('App.js: ' + err)}
  //     />
  //   );
  // }

  return (
    <Provider store={store}>
      <AppLoader />
    </Provider>
  );
}
