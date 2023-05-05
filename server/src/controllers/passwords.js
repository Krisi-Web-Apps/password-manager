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

module.exports = {
  post,
};
