import { cacheCipher, DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting';
import Encryption, { EncryptionParams } from '/@/utils/encryption';

export interface CreateStorageParams extends EncryptionParams {
  storage: Storage;
  hasEncrypt: boolean;
}
/**
 *
 * @param prefixKey 键名前缀,默认''
 * @param storage 缓存,默认使用 sessionStorage
 * @param hasEncrypt 确认加密
 */
export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  hasEncrypt = true,
} = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16))
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  const encryption = new Encryption({ key, iv });
  class WebStorage {
    private storage: Storage;
    private encryption: Encryption;
    private hasEncrypt: boolean;
    private prefixKey?: string;
    constructor() {
      this.storage = storage;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
      this.prefixKey = prefixKey;
    }
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }
    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }
    get(key: string, def: any = null) {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const decItem = this.hasEncrypt ? this.encryption.decryptByAES(item) : item;
          const { value, expire } = JSON.parse(decItem);
          if (expire === null || expire >= new Date().getTime()) return value;
          this.remove(key);
        } catch (e) {
          return def;
        }
      }
      return def;
    }
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }
    clear() {
      this.storage.clear();
    }
  }
  return new WebStorage();
};
