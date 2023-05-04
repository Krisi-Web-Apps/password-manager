const emailValidator = require("../../../validators/email");
const passwordValidator = require("../../../validators/password");
const usernameValidator = require("../../../validators/username");

const validate = (username, email, password, cpassword) => {
    if (!usernameValidator(username)) return "Invalid username!";
    if (!emailValidator(email)) return "Invalid email address!";
    if (!passwordValidator(password)) return "Invalid password!";
    if (password !== cpassword) return "Password's don't match!";
    else true;
}

module.exports = validate;
