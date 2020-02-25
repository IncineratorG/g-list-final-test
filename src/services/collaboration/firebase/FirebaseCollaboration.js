import {firebase} from '@react-native-firebase/messaging';

export class FirebaseCollaboration {
  static async signUp({phone, email, password}) {
    const fcmToken = await firebase.messaging().getToken();

    const registrationData = {
      phone: phone,
      email: email,
      password: password,
      token: fcmToken,
    };
    const stringifiedRegistrationData = JSON.stringify(registrationData);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/registerUser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: stringifiedRegistrationData,
        },
      );

      const responseData = await response.json();
      if (responseData.status === 'BAD_REQUEST_DATA') {
        responseData.description = 'Невенрные введённые данные';
      } else if (responseData.status === 'ALREADY_EXIST') {
        responseData.description = 'Такой пользователь уже существует';
      }

      return responseData;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async signIn({email, password}) {}
}
