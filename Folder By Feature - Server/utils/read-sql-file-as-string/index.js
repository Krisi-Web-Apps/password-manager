const fs = require("fs");

const readSQLFileAsString = (filePath) => {
    return fs.readFileSync(`${filePath}.sql`).toString();
}

module.exports = readSQLFileAsString;