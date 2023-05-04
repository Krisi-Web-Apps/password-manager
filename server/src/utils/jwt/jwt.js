const jwt = require("jsonwebtoken");

const createToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY_JWT_TOKEN, { expiresIn: process.env.EXPIRES_IN });
    return token;
}

const verifyToken = (token) => {
    const decodedData = jwt.verify(token, process.env.SECRET_KEY_JWT_TOKEN);
    return decodedData;
}

module.exports = {
    createToken,
    verifyToken,
}
