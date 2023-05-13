const { jwt, cryptojs } = require("../utils");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send({ message: "Invalid token!" });
    return;
  }

  const splittedToken = token.split(" ")[1];

  const decryptedToken = cryptojs.decryptData(splittedToken);
  const decodedData = jwt.verifyToken(decryptedToken);

  if (!decodedData) {
    res.status(400).send({ message: "Invalid token!" });
    return;
  }

  req.user = decodedData;
  next();
};

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (!user) {
    res.status(400).send({ message: "Invalid token!" });
    return;
  }

  if (user.role_as !== "admin") {
    res.status(400).send({ message: "You are not admin!" });
    return;
  }

  next();
};

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(400).send({
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
