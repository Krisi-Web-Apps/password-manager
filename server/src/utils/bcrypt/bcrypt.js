const bcrypt = require("bcrypt");

const hash = (data) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedData = bcrypt.hashSync(data, salt);
    return hashedData;
}

module.exports = {
    hash,
}
