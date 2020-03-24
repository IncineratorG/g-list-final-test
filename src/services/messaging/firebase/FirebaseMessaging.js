import {FirebaseMessageParser} from './parser/FirebaseMessageParser';

export class FirebaseMessaging {
  static processMessage(message) {
    const command = FirebaseMessageParser.parse(message);
    command.execute();
  }
}
