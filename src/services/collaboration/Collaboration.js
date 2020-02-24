import {FirebaseCollaboration} from './firebase/FirebaseCollaboration';

export class Collaboration {
  static async signUp({email, password}) {
    await FirebaseCollaboration.signUp({email, password});
  }

  static async signIn({email, password}) {}
}
