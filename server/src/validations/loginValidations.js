const { users } = require("@src/validators");

const registerValidations = (email, password) => {
    if (!users.email(email)) return "Invalid email address!";
    if (!users.password(password)) return "Invalid password!";
    else true;
}

module.exports = registerValidations;
