const asyncHandler = require("express-async-handler");

const passwordsValidations = require("@src/validations/passwords");
const passwords = require("@src/services/passwords");
const { cryptojs } = require("@src/utils");

const post = {
  insert: asyncHandler(async (req, res) => {
    const { title, desc, password, id } = req.body;
    const userId = req.user.id;

    const result = passwordsValidations.insert(title, password);

    if (typeof result === "string") {
      res.status(400).send({ message: result });
      return;
    }

    const encryptedPassword = cryptojs.encryptData(password);
    
    let passwordResult = null;

    if (!id) {
      const savedPasswordResult = await passwords.post.insert(
        title,
        desc,
        encryptedPassword,
        userId
      );
      passwordResult = await passwords.get.byId(
        savedPasswordResult.insertId
      );
    } else {
      await passwords.post.update(title, desc, encryptedPassword, id);

      passwordResult = await passwords.get.byId(id);
    }

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

    passwordsResult.forEach((passwordItem) => {
      const decryptedPassword = cryptojs.decryptData(passwordItem.password);
      passwordItem.password = decryptedPassword;
    });

    res.send(passwordsResult);
  }),
  byIdByLoggedUser: asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!parseInt(id)) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    const passwordResult = await passwords.get.byId(id);

    if (passwordResult.length === 0) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    const decryptedPassword = cryptojs.decryptData(passwordResult[0].password);

    res.send({ ...passwordResult[0], password: decryptedPassword });
  }),
};

const del = {
  byId: asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!parseInt(id)) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }
    
    const deletedResult = await passwords.del.byId(id);

    if (deletedResult.affectedRows === 0) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    res.send({ message: "success" });
  }),
}

module.exports = {
  post,
  get,
  del,
};
