import { getStorageShortName } from '../env';
import { CreateStorageParams, createStorage as create } from './storageCache';
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '/@/settings/encryptionSetting';

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage = sessionStorage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const createStorage = (storage: Storage = sessionStorage, opt = {}) =>
  create(createOptions(storage, opt))!;

export const createSessionStorage = (opt: Options = {}) =>
  createStorage(sessionStorage, { ...opt, timeout: DEFAULT_CACHE_TIME });

export const createLocalStorage = (opt: Options = {}) =>
  createStorage(localStorage, { ...opt, timeout: DEFAULT_CACHE_TIME });

export const WebStorage = createStorage();

export default WebStorage;
