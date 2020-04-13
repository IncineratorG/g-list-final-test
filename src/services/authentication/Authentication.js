import {FirebaseAuthentication} from './firebase/FirebaseAuthentication';

export class Authentication {
  static async signUp({phone, email, password}) {
    try {
      return await FirebaseAuthentication.signUp({
        phone,
        email,
        password,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async signIn({phone, email, password}) {
    try {
      return await FirebaseAuthentication.signIn({phone, email, password});
    } catch (e) {
      throw new Error(e);
    }
  }
}
