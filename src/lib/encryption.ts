/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

const SECRET_KEY = "mySuperSecretKey123"; // Ideally, use process.env.SECRET_KEY

// Type for any object that can be encrypted
type QueryData = Record<string, any>;

// Encrypt function
export const encryptQuery = (data: QueryData): string => {
  const stringData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
};

// Decrypt function
export const decryptQuery = (cipherText: string): QueryData => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedData) {
    throw new Error("Decryption failed. Invalid cipher text.");
  }

  return JSON.parse(decryptedData);
};
