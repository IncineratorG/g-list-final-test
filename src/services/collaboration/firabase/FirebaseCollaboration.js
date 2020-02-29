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
}
