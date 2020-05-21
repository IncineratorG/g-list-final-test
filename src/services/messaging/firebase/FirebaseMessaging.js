import {FirebaseMessageParser} from './parser/FirebaseMessageParser';

export class FirebaseMessaging {
  static processMessage(message) {
    console.log('FirebaseMessaging->processMessage()');

    // const command = FirebaseMessageParser.parse(message);
    // command.execute();
  }
}
