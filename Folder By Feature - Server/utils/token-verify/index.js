const jwt = require("jsonwebtoken");

const tokenVerify = (token) => {
    const decodedData = jwt.verify(token, process.env.SECRET_KEY_JWT_TOKEN);
    return decodedData;
}

module.exports = tokenVerify;
