// import { CryptoJS } from "crypto-js";
import CryptoJS from 'crypto-js';

// Fungsi untuk mengenkripsi teks
const encryptText = (text, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey);
  return encrypted.toString();
};

// Fungsi untuk mendekripsi teks
const decryptText = (encryptedText, secretKey) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const generateRandomKey = () => {
  const array = new Uint8Array(16); // Gunakan panjang yang sesuai dengan kebutuhan Anda (misalnya, 16 byte untuk key AES-128)
  crypto.getRandomValues(array);
  return Array.from(array, (byte) =>
    ("0" + (byte & 0xff).toString(16)).slice(-2)
  ).join("");
};

export { encryptText, decryptText, generateRandomKey };