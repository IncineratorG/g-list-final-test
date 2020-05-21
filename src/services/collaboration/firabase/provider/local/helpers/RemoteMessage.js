export class RemoteMessage {
  static create({senderEmail, shoppingListName}) {
    if (!senderEmail || !shoppingListName) {
      console.log('RemoteMessage->create(): BAD_DATA');
      return '';
    }

    const message =
      'Пользователь ' +
      senderEmail +
      ' поделился с вами списком ' +
      shoppingListName;

    return message;
  }
}
