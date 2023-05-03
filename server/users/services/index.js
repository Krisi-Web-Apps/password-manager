const register = require("./register");
const login = require("./login");
const byEmail = require("./by-email");
const byUsername = require("./by-username");
const updatePasswordByEmail = require("./update-password-by-email");

module.exports = {
    register,
    login,
    byEmail,
    byUsername,
    updatePasswordByEmail,
}
