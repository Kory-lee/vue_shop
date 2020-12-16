import CryptoES from 'crypto-es';

export interface EncryptionParams {
  key: string;
  iv: string;
}

export default class Encryption {
  private key;
  private iv;

  constructor({ key, iv }: EncryptionParams) {
    this.key = CryptoES.enc.Utf8.parse(key);
    this.iv = CryptoES.enc.Utf8.parse(iv);
  }
  get getOption(): CryptoES.lib.CipherCfg {
    return { mode: CryptoES.mode.CBC as any, padding: CryptoES.pad.Pkcs7, iv: this.iv };
  }
  encryptByAES(str: string) {
    const encrypted = CryptoES.AES.encrypt(str, this.key, this.getOption);
    return encrypted.toString();
  }

  decryptByAES(str: string) {
    const decrypted = CryptoES.AES.decrypt(str, this.key, this.getOption);
    return decrypted.toString(CryptoES.enc.Utf8);
  }
}
