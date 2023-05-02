const emailValidator = require("../../../validators/email");
const passwordValidator = require("../../../validators/password");

const validate = (email, password) => {
    if (!emailValidator(email)) return "Invalid email address!";
    if (!passwordValidator(password)) return "Invalid password!";
    else true;
}

module.exports = validate;
