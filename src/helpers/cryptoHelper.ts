import CryptoJS from "crypto-js";

class CryptoHelper {
  static encrypt(plainText: string): string {
    let key = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_KEY);
    let iv = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_IV);
    let encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      key,
      {
        iv: iv,
        keySize: 256,
      }
    );

    return encrypted.toString();
  }
}

export default CryptoHelper;
