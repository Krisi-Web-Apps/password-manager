const register = require("./register");
const login = require("./login");
const byEmail = require("./by-email");
const byUsername = require("./by-username");
const updatePasswordByEmail = require("./update-password-by-email");
const updateEmailById = require("./update-email-by-id");
const updateUserById = require("./update-user-by-id");
const fetchItems = require("./fetch-items");

module.exports = {
    register,
    login,
    byEmail,
    byUsername,
    updatePasswordByEmail,
    updateEmailById,
    updateUserById,
    fetchItems,
}
