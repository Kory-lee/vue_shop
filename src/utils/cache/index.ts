import { createStorage as create } from './storageCache';
import { enableStorageEncryption } from '/@/settings/encryptionSetting';

const createOptions = (storage = sessionStorage) => {
  return { hasEncrypt: enableStorageEncryption, storage };
};

export const createStorage = (storage: Storage = sessionStorage) => create(createOptions(storage))!;

export default create(createOptions());
