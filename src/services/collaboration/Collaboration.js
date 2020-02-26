import {FirebaseCollaboration} from './firebase/FirebaseCollaboration';

export class Collaboration {
  static async signUp({phone, email, password}) {
    try {
      return await FirebaseCollaboration.signUp({
        phone,
        email,
        password,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async signIn({phone, password}) {
    try {
      return await FirebaseCollaboration.signIn({phone, password});
    } catch (e) {
      throw new Error(e);
    }
  }
}
