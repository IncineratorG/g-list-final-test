import {firebase} from '@react-native-firebase/messaging';

export class FirebaseCollaboration {
  static async signUp({email, password}) {
    const fcmToken = await firebase.messaging().getToken();

    const response = await fetch(
      'https://us-central1-surveillance-136a9.cloudfunctions.net/registerUser',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          name: email,
          password: password,
          token: fcmToken,
        },
      },
    );

    console.log(
      'FirebaseCollaboration.signUp()->RESPONSE: ' +
        JSON.stringify(response.json()),
    );
  }

  static async signIn({email, password}) {}
}
