const CryptoJS = require("crypto-js");

const tokenDecrypt = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.CRYPTO_JS_SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

module.exports = tokenDecrypt;
