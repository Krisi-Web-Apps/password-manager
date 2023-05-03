const CryptoJS = require("crypto-js");

const tokenEncrypt = (data) => {
    const stringified = JSON.stringify(data);
    const encriptedData = CryptoJS.AES.encrypt(stringified, process.env.CRYPTO_JS_SECRET_KEY).toString();
    return encriptedData;
}

module.exports = tokenEncrypt;
