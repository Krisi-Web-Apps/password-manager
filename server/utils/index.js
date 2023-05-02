const executeQuery = (sql, connection) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });

    return promise;
}

const fs = require("fs");

const readSQLFileAsString = (filePath) => {
    return fs.readFileSync(`${filePath}.sql`).toString();
}

module.exports = {
    executeQuery,
    readSQLFileAsString,
}
