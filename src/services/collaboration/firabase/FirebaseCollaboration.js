export class FirebaseCollaboration {
  static async checkUserExistence({phone}) {
    const checkData = {
      phone,
    };
    const serializedCheckData = JSON.stringify(checkData);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/checkUser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: serializedCheckData,
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
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/sendMessage',
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

      console.log('RESPONSE: ' + JSON.stringify(responseData));

      return 'SUCCESS';
    } catch (e) {
      throw new Error(e);
    }
  }

  static async shareShoppingList({
    receiver,
    sender,
    shoppingList,
    units,
    classes,
  }) {
    console.log('HERE_HERE_HERE');

    const data = {
      receiver,
      sender,
      shoppingList,
      units,
      classes,
    };
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/shareShoppingList',
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

      const {status, sharedListKey} = responseData;

      console.log('RESPONSE_STATUS: ' + status);
      console.log('RESPONSE_KEY: ' + sharedListKey);

      return 'SUCCESS';
    } catch (e) {
      throw new Error(e);
    }
  }
}
