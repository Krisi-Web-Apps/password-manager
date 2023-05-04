const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const fetchItems = async () => {
    const sql = `SELECT id, first_name, last_name, email, username, created_at, role_as FROM users;`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = fetchItems;