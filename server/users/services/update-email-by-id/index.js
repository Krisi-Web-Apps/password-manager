const connection = require("../../../config/db");
const { executeQuery } = require("../../../utils");

const changeEmailById = async (id, email) => {
    const sql = `UPDATE users SET email='${email}' WHERE id = ${id};`;
    const result = await executeQuery(sql, connection);
    return result;
}

module.exports = changeEmailById;