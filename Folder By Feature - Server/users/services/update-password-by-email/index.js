const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const updatePasswordByEmail = async (email, password) => {
    const sql = `UPDATE users SET password='${password}' WHERE email = '${email}';`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = updatePasswordByEmail;
