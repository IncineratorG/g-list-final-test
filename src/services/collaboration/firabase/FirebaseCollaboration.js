export class FirebaseCollaboration {
  static async checkUserExistence({phone}) {
    const checkData = {
      phone,
    };
    const stringifiedCheckData = JSON.stringify(checkData);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/checkUser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: stringifiedCheckData,
        },
      );

      const responseData = await response.json();

      if (responseData.status === 'USER_EXISTS') {
        return 'EXIST';
      } else {
        return 'NOT_EXIST';
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  static async sendTextMessage({receiverPhone, senderPhone, messageText}) {
    const data = {
      receiver: receiverPhone,
      sender: senderPhone,
      textMessage: messageText,
    };
    const stringifiedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/sendMessage',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: stringifiedData,
        },
      );

      const responseData = await response.json();

      console.log('RESPONSE: ' + JSON.stringify(responseData));

      return 'SUCCESS';
    } catch (e) {
      throw new Error(e);
    }
  }
}
