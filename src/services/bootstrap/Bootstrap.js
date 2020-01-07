import {Storage} from '../storage/Storage';

export default class Bootstrap {
  static start() {
    return new Promise((resolve, reject) => {
      Storage.init().then(result => {
        resolve();
      });
    });
  }
}
