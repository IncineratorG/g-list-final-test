import {FirebaseCollaboration} from './firabase/FirebaseCollaboration';

export class Collaboration {
  static async userExist({phone}) {
    try {
      const result = await FirebaseCollaboration.checkUserExistence({phone});
      return result === 'EXIST';
    } catch (e) {
      throw new Error(e);
    }
  }

  static async sendMessage({receiverPhone, senderPhone, messageText}) {
    try {
      const result = await FirebaseCollaboration.sendTextMessage({
        receiverPhone,
        senderPhone,
        messageText,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
