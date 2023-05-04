const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const updateUserById = async (id, { first_name, last_name }) => {
    const sql = `UPDATE users SET first_name='${first_name}', last_name='${last_name}' WHERE id = ${id};`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = updateUserById;