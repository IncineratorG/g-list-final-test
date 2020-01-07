import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppLoading} from '../../components/common/AppLoading';

const MainScreen_V2 = ({navigation}) => {
  const [isReady, setIsReady] = useState(false);

  const asyncFunc = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={asyncFunc}
        onFinish={() => console.log('FROM_MAIN_SCREEN_V2->ON_FINISH')}
        onError={error => console.log('err: ' + error)}
      />
    );
  }

  return <View style={styles.mainContainer} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default MainScreen_V2;
