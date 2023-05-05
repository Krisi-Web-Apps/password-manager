const connection = require("@src/config/db");
const executeQuery = require("@src/utils/queries/execute-query");

const post = {
    insert: async (title, desc, password, user_id) => {
        const sql = `INSERT INTO \`passwords\` (\`title\`, \`desc\`, \`password\`, \`user_id\`) VALUES ('${title}', '${desc}', '${password}', ${user_id});`;
        const result = await executeQuery(sql, connection);
        return result;
    }
}

const get = {
    byId: async (id) => {
        const sql = `SELECT * FROM passwords WHERE id = ${id}`;
        const result = await executeQuery(sql, connection);
        return result;
    },
    items: async () => {
        const sql = `SELECT * FROM passwords;`;
        const result = await executeQuery(sql, connection);
        return result;
    },
    itemsByUserId: async (userId) => {
        const sql = `SELECT * FROM passwords WHERE user_id = ${userId};`;
        const result = await executeQuery(sql, connection);
        return result;
    }
}

module.exports = {
    post,
    get,
}
