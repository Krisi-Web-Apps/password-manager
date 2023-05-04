const executeQuery = (sql, connection) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });

    return promise;
}

module.exports = executeQuery;