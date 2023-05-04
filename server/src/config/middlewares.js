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

const isAdmin = (req, res, next) => {
    const user = req.user;

    if (!user) {
        res.send({ message: "Invalid token!" });
        return;
    }

    if (user.role_as !== "admin") {
        res.send({ message: "You are not admin!" });
        return;
    }

    next();
}

module.exports = {
    isAuth,
    isAdmin,
}
