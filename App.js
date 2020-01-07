import React, {useState} from 'react';
import {AppLoading} from './src/components/common/AppLoading';
import AppNavigation from './src/components/navigation/AppNavigation';
import Bootstrap from './src/services/bootstrap/Bootstrap';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={Bootstrap.start}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return <AppNavigation />;
}
