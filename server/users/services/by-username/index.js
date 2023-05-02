const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const byUsername = async (username) => {
    const sql = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = byUsername;
