const bcrypt = require("bcrypt");

const hash = (data) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedData = bcrypt.hashSync(data, salt);
    return hashedData;
}

const verify = (password, hash) => {
    const result = bcrypt.compareSync(password, hash);
    return result;
}

module.exports = {
    hash,
    verify,
}
