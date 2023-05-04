const connection = require("@src/config/db");
const executeQuery = require("@src/utils/queries/execute-query");

const post = {
  insert: async (first_name, last_name, username, email, password) => {
    const sql = `INSERT INTO users (first_name, last_name, username, email, password) VALUES ('${first_name}', '${last_name}', '${username}', '${email}', '${password}');`;
    const result = await executeQuery(sql, connection);
    return result;
  },
  save: async (id, first_name, last_name) => {
    const sql = `UPDATE users SET first_name='${first_name}', last_name='${last_name}' WHERE id = ${id}`;
    const result = await executeQuery(sql, connection);
    return result;
  }
};

const get = {
  byEmail: async (email) => {
    const sql = `SELECT id, first_name, last_name, username, email, role_as, created_at FROM users WHERE email = '${email}';`;
    const result = await executeQuery(sql, connection);
    return result;
  },
  byUsername: async (username) => {
    const sql = `SELECT id, first_name, last_name, username, email, role_as, created_at FROM users WHERE username = '${username}';`;
    const result = await executeQuery(sql, connection);
    return result;
  },
  byId: async (id) => {
    const sql = `SELECT first_name, last_name, username, email, role_as, created_at FROM users WHERE id = ${id}`;
    const result = await executeQuery(sql, connection);
    return result;
  },
  items: async () => {
    const sql = `SELECT first_name, last_name, username, email, role_as, created_at FROM users;`;
    const result = await executeQuery(sql, connection);
    return result;
  }
}

module.exports = {
  post,
  get,
};
