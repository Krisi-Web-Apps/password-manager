const register = require("./register");
const login = require("./login");
const changePassword = require("./change-password");
const changeEmail = require("./change-email");
const updateUserById = require("./update-user-by-id");
const fetchItems = require("./fetch-items");

module.exports = {
    register,
    login,
    changePassword,
    changeEmail,
    updateUserById,
    fetchItems,
}
