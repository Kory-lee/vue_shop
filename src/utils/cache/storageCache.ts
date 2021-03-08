import { AesEncryption, EncryptionParams } from '../encryption';
import { isNullOrUnDef } from '../is';
import { cacheCipher } from '/@/settings/encryptionSetting';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
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
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16))
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  const encryption = new AesEncryption({ key, iv });

  class WebStorage {
    private storage: Storage;
    private encryption: AesEncryption;
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

    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }
    /**
     * Read cache
     * @param{string} key
     * @param def
     */
    get(key: string, def: any = null) {
      const item = this.storage.getItem(this.getKey(key));
      if (!item) return def;
      try {
        const decItem = this.hasEncrypt ? this.encryption.decryptByAES(item) : item;
        const { value, expire } = JSON.parse(decItem);
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) return value;
        this.remove(key);
      } catch (e) {
        return def;
      }
    }
    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }
    clear() {
      this.storage.clear();
    }
  }
  return new WebStorage();
};
