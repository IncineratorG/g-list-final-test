import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {AppLoading} from './src/components/common/AppLoading';
import Bootstrap from './src/services/bootstrap/Bootstrap';
import store from './src/store';
import AppLoader from './src/components/loader/AppLoader';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={Bootstrap.start}
        onFinish={() => setIsReady(true)}
        onError={err => console.log('App.js: ' + err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppLoader />
    </Provider>
  );
}
