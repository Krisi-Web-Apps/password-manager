const { jwt, cryptojs } = require("@src/utils");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.send({ message: "Invalid token!" });
    return;
  }

  const splittedToken = token.split(" ")[1];

  const decryptedToken = cryptojs.decryptData(splittedToken);
  const decodedData = jwt.verifyToken(decryptedToken);

  if (!decodedData) {
    res.send({ message: "Invalid token!" });
    return;
  }

  req.user = decodedData;
  next();
};

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
};

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.send({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
};

module.exports = {
  isAuth,
  isAdmin,
  errorHandler,
};