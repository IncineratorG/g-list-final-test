export class IdManager {
  static getFirebaseId(signInInfo) {
    if (!signInInfo || !signInInfo.email) {
      return undefined;
    }

    const email = signInInfo.email;
    return email
      .replace(atSign, atReplacer)
      .replace(dotSignGlobal, dotReplacer)
      .replace(shiftSignGlobal, shiftReplacer)
      .replace(dollarSignGlobal, dollarReplacer)
      .replace(openBracketSignGlobal, openBracketReplacer)
      .replace(closeBracketSignGlobal, closeBracketReplacer);
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
const atReplacer = '@';

const dotSign = '.';
const dotSignGlobal = /\./g;
const dotReplacer = '%';
const dotReplacerGlobal = /%/g;

const shiftSign = '#';
const shiftSignGlobal = /#/g;
const shiftReplacer = '*';
const shiftReplacerGlobal = /\*/g;

const dollarSign = '$';
const dollarSignGlobal = /\$/g;
const dollarReplacer = '^';
const dollarReplacerGlobal = /\^/g;

const openBracketSign = '[';
const openBracketSignGlobal = /\[/g;
const openBracketReplacer = '+';
const openBracketReplacerGlobal = /\+/g;

const closeBracketSign = ']';
const closeBracketSignGlobal = /]/g;
const closeBracketReplacer = '-';
const closeBracketReplacerGlobal = /-/g;
