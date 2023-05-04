const { users } = require("@src/validators");

const registerValidations = (first_name, last_name, username, email, password, cpassword) => {
    if (!first_name || !last_name) return "First and last name are required!";
    if (password !== cpassword) return "Password's dpn't match!";
    if (!users.username(username)) return "Invalid username!";
    if (!users.email(email)) return "Invalid email address!";
    if (!users.password(password)) return "Invalid password!";
    else true;
}

module.exports = registerValidations;
