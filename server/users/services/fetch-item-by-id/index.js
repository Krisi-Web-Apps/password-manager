const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const fetchItemById = async (id) => {
    const sql = `SELECT id, first_name, last_name, username, email, created_at, role_as FROM users WHERE id = ${id}`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = fetchItemById;