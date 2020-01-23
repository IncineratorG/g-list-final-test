import {Storage} from '../storage/Storage';

export default class Bootstrap {
  static async start() {
    const storageInitialized = await Storage.isInitialized();
    if (!storageInitialized) {
      await Storage.init();
    }
  }
}
