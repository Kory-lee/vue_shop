import { isDevMode } from '../utils/env';

export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export const cacheCipher = {
  key: '_12345678901234@',
  iv: '@12345678901234_',
};

export const enableStorageEncryption = !isDevMode();
