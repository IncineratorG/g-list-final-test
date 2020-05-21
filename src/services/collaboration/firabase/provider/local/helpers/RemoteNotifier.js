import {FirebaseResponse} from '../../../response/FirebaseResponse';

export class RemoteNotifier {
  static async notify({receivers, message}) {
    console.log('RemoteNotifier->notify()');

    const data = {receivers, message};
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/notifyUsers',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: serializedData,
        },
      );

      const responseData = await response.json();

      const {status} = responseData;

      if (status === 'SUCCESS') {
        return FirebaseResponse.type.SUCCESS;
      } else {
        return FirebaseResponse.type.ERROR;
      }
    } catch (e) {
      console.log('RemoteNotifier->notify()->ERROR: ' + e);
      throw new Error(e);
    }
  }
}
