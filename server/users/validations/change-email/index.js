const passwordEmail = require("../../../validators/email");

const validate = (newEmail, cnewEmail) => {
    if (passwordEmail(newEmail)) return "Invalid email!";
    if (newEmail !== cnewEmail) return "Email's don't match!";
}

module.exports = validate;
