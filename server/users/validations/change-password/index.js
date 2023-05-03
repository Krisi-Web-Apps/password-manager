const passwordValidator = require("../../../validators/password");

const validate = (newPassword, cnewPassword) => {
    if (!passwordValidator(newPassword)) return "Invalid password!";
    if (newPassword !== cnewPassword) return "Password's don't match!";
}

module.exports = validate;
