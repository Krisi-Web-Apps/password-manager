const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const byEmail = async (email) => {
    const sql = `SELECT id, username, email, first_name, last_name, created_at, role_as FROM users WHERE email = '${email}'`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = byEmail;
