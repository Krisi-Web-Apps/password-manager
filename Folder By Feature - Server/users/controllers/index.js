const register = require("./register");
const login = require("./login");
const changePassword = require("./change-password");
const changeEmail = require("./change-email");
const updateUserById = require("./update-user-by-id");
const fetchItems = require("./fetch-items");
const fetchItemById = require("./fetch-item-by-id");

module.exports = {
    register,
    login,
    changePassword,
    changeEmail,
    updateUserById,
    fetchItems,
    fetchItemById,
}
