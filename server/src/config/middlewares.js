const jwt = require("@src/utils/jwt/jwt");

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.send({ message: "Invalid token!" });
        return;
    }

    const splittedToken = token.split(" ")[1];
    const decodedData = jwt.verifyToken(splittedToken);

    if (!decodedData) {
        res.send({ message: "Invalid token!" });
        return;
    }

    req.user = decodedData;
    next();
}

module.exports = {
    isAuth,
}
