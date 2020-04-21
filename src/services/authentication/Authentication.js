import {FirebaseAuthentication} from './firebase/FirebaseAuthentication';
import {AuthenticationStorage} from './storage/AuthenticationStorage';
import {StorageNotifier} from '../common-data/storage-notifier/StorageNotifier';

export class Authentication {
  static async subscribe({entityIds, event, handler, once = false}) {
    const unsubscribe = once
      ? () => {}
      : Authentication.notifier.subscribe({entityIds, event, handler});

    let data;
    if (event === Authentication.events.SIGN_IN_INFO_CHANGED) {
      data = await AuthenticationStorage.getLocalSignInInfo();
    }

    return {unsubscribe, data};
  }

  static async init() {
    this.setSubscriptions();

    const result = await AuthenticationStorage.isInitialized();
    if (result.length <= 0) {
      await AuthenticationStorage.init();
    }
  }

  static off() {
    this.removeSubscriptions();
  }

  static setSubscriptions() {
    Authentication.localSubscriptions.push(
      AuthenticationStorage.subscribe({
        event: AuthenticationStorage.events.LOCAL_SIGN_IN_INFO_UPDATED,
        handler: ({localSignInInfo}) => {
          Authentication.notifier.notify({
            event: Authentication.events.SIGN_IN_INFO_CHANGED,
            data: localSignInInfo,
          });
        },
      }),
    );

    Authentication.localSubscriptions.push(
      AuthenticationStorage.subscribe({
        event: AuthenticationStorage.events.LOCAL_SIGN_IN_INFO_REMOVED,
        handler: ({localSignInInfo}) => {
          Authentication.notifier.notify({
            event: Authentication.events.SIGN_IN_INFO_CHANGED,
            data: localSignInInfo,
          });
        },
      }),
    );
  }

  static removeSubscriptions() {
    Authentication.localSubscriptions.forEach(unsubscribeFunc => {
      unsubscribeFunc();
    });

    Authentication.localSubscriptions.length = 0;
  }

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

  static async updateSignInInfo({phone, email, password}) {
    await AuthenticationStorage.updateLocalSignInInfo({phone, email, password});
  }

  static async removeSignInInfo() {
    await AuthenticationStorage.removeLocalSignInInfo();
  }
}

Authentication.events = {
  SIGN_IN_INFO_CHANGED: 'SIGN_IN_INFO_CHANGED',
};
Authentication.notifier = new StorageNotifier({});
Authentication.localSubscriptions = [];
