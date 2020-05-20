/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {Messaging} from './src/services/messaging/Messaging';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => task());
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Messaging.processMessage(remoteMessage);

  console.log(
    'Message handled in the background!',
    JSON.stringify(remoteMessage.data),
  );
});

// const task = () => {
//   console.log('HEADLESS_TASK');
// };
