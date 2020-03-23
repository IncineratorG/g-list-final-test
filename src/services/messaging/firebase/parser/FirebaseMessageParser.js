import {Message} from '../Message';
import {Command} from '../command/Command';

export class FirebaseMessageParser {
  static parse(message) {
    const data = message.data;
    const payload = JSON.parse(data.serializedPayload);

    switch (payload.type) {
      case Message.types.UPDATE: {
        const updateShoppingListAction = () => {

        };

        return new Command(updateShoppingListAction());
      }

      default: {
        console.log(
          'FirebaseMessageParser->parse()=>UNKNOWN_MESSAGE_TYPE: ' +
            payload.type,
        );

        return new Command(undefined);
      }
    }
  }
}
