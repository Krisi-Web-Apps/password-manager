const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const register = async (username, email, password, first_name = "", last_name = "") => {
    const sql = `INSERT INTO users (username, email, password, first_name, last_name) VALUES ('${username}', '${email}', '${password}', '${first_name}', '${last_name}');`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = register;
