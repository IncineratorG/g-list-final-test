import {FirebaseCollaboration} from './firebase/FirebaseCollaboration';

export class Collaboration {
  static async signUp({phone, email, password}) {
    try {
      const result = await FirebaseCollaboration.signUp({
        phone,
        email,
        password,
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async signIn({email, password}) {}
}
