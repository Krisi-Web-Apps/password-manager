const { username, email, password } = require("../validators");

const register = (first_name, last_name, usernameText, emailText, passwordText, cpassword) => {
    if (!first_name || !last_name) return "First and last name are required!";
    if (passwordText !== cpassword) return "Password's dpn't match!";
    if (!username(usernameText)) return "Invalid username!";
    if (!email(emailText)) return "Invalid email address!";
    if (!password(passwordText)) return "Invalid password!";
    else true;
}

const login = (emailText, passwordText) => {
    if (!email(emailText)) return "Invalid email address!";
    if (!password(passwordText)) return "Invalid password!";
    else true;
}

const changeEmail = (new_email, cnew_email) => {
    if (new_email !== cnew_email) return "Email's don't match!";
    if (!email(new_email)) return "Invalid email address!";
    else true;
}

const changePassword = (new_password, cnew_password) => {
    if (new_password !== cnew_password) return "Password's don't match!";
    if (!password(new_password)) return "Invalid password!";
    else true;
}

module.exports = {
    register,
    login,
    changeEmail,
    changePassword,
};
