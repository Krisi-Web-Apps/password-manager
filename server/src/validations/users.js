const { users } = require("@src/validators");

const register = (first_name, last_name, username, email, password, cpassword) => {
    if (!first_name || !last_name) return "First and last name are required!";
    if (password !== cpassword) return "Password's dpn't match!";
    if (!users.username(username)) return "Invalid username!";
    if (!users.email(email)) return "Invalid email address!";
    if (!users.password(password)) return "Invalid password!";
    else true;
}

const login = (email, password) => {
    if (!users.email(email)) return "Invalid email address!";
    if (!users.password(password)) return "Invalid password!";
    else true;
}

const changeEmail = (new_email, cnew_email) => {
    if (new_email !== cnew_email) return "Email's don't match!";
    else true;
}

module.exports = {
    register,
    login,
    changeEmail,
};
