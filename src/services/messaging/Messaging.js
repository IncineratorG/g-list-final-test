import {FirebaseMessaging} from './firebase/FirebaseMessaging';

export class Messaging {
  static processMessage(message) {
    FirebaseMessaging.processMessage(message);
  }
}
