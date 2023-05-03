const bcrypt = require("bcrypt");

const passwordVerify = (passwordInput, userPassword) => {
    const isValid = bcrypt.compareSync(passwordInput, userPassword);
    return isValid;
}

module.exports = passwordVerify;
