const { tokenDecrypt, tokenVerify } = require("../../../utils");

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.send({ message: "Invalid token!" });
        return;
    }

    const splittedToken = token.split(" ")[1];

    const plainToken = tokenDecrypt(splittedToken);
    const decodedToken = tokenVerify(plainToken);

    if (!decodedToken) {
        res.send({ message: "Invalid token!" });
        return;
    }

    req.user = decodedToken;
    next();
}

module.exports = isAuth;
