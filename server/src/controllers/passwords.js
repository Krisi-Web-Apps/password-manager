const asyncHandler = require("express-async-handler");

const passwordsValidations = require("@src/validations/passwords");
const passwords = require("@src/services/passwords");
const { cryptojs } = require("@src/utils");

const post = {
  insert: asyncHandler(async (req, res) => {
    const { title, desc, password } = req.body;
    const userId = req.user.id;

    const result = passwordsValidations.insert(title, password);

    if (typeof result === "string") {
      res.send({ message: result });
      return;
    }

    const encryptedPassword = cryptojs.encryptData(password);

    const savedPasswordResult = await passwords.post.insert(
      title,
      desc,
      encryptedPassword,
      userId
    );

    const passwordResult = await passwords.get.byId(
      savedPasswordResult.insertId
    );

    const decryptedPassword = cryptojs.decryptData(passwordResult[0].password);

    res.send({
      ...passwordResult[0],
      password: decryptedPassword,
    });
  }),
};

const get = {
  items: asyncHandler(async (req, res) => {
    const passwordsResult = await passwords.get.items();
    res.send(passwordsResult);
  }),
  byLoggedInUser: asyncHandler(async (req, res) => {
    const user = req.user;

    const passwordsResult = await passwords.get.itemsByUserId(user.id);

    passwordsResult.forEach(passwordItem => {
      const decryptedPassword = cryptojs.decryptData(passwordItem.password);
      passwordItem.password = decryptedPassword;
    });

    res.send(passwordsResult);
  }),
}

module.exports = {
  post,
  get,
};
