export class IdManager {
  static getFirebaseId(signInInfo) {
    if (!signInInfo || !signInInfo.email) {
      return undefined;
    }

    const email = signInInfo.email;
    return email.replace(atSign, atReplacer).replace(dotSign, dotReplacer);
  }

  static getLocalId(signInInfo) {
    if (!signInInfo || !signInInfo.email) {
      return undefined;
    } else {
      return signInInfo.email;
    }
  }
}

const atSign = '@';
const dotSign = '.';
const atReplacer = ',';
const dotReplacer = ',,';
