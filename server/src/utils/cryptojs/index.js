const CryptoJS = require("crypto-js");

const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    data,
    process.env.ENCRYPTION_SECRET
  ).toString();
  return encryptedData;
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, process.env.ENCRYPTION_SECRET);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData;
};

module.exports = {
  encryptData,
  decryptData,
};
