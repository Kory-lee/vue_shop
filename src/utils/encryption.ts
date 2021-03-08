import { decrypt, encrypt } from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import md5 from 'crypto-js/md5';
import ECB from 'crypto-js/mode-ecb';
import pkcs7 from 'crypto-js/pad-pkcs7';

export interface EncryptionParams {
  key: string;
  iv: string;
}

export class AesEncryption {
  private key;
  private iv;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt;
    if (key) this.key = Utf8.parse(key);
    if (iv) this.iv = Utf8.parse(iv);
  }

  get getOptions() {
    return { mode: ECB, padding: pkcs7, iv: this.iv };
  }

  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString();
  }
  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString();
  }
}

export function encryptByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(Utf8);
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(Utf8);
}

export function encryptByMd5(password: string) {
  return md5(password).toString();
}
