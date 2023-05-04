const asyncHandler = require("express-async-handler");

const { users } = require("@src/services");
const registerValidations = require("@src/validations/registerValidations");
const loginValidations = require("@src/validations/loginValidations");
const { bcrypt, jwt } = require("@src/utils");

const post = {
  register: asyncHandler(async (req, res) => {
    const { first_name, last_name, username, email, password, cpassword } =
      req.body;

    const validationsResult = registerValidations(
      first_name,
      last_name,
      username,
      email,
      password,
      cpassword
    );

    if (typeof validationsResult === "string") {
      res.send({ message: validationsResult });
      return;
    }

    const userUsernameResult = await users.get.byUsername(email);

    if (userUsernameResult.length > 0) {
      res.send({ message: "Dublicate username!" });
      return;
    }

    const userEmailResult = await users.get.byEmail(email);

    if (userEmailResult.length > 0) {
      res.send({ message: "Dublicate email address!" });
      return;
    }

    const passwordHash = bcrypt.hash(password);

    const userInsertResult = await users.post.insert(
      first_name,
      last_name,
      username,
      email,
      passwordHash
    );

    res.send({ affected_rows: userInsertResult.affectedRows });
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const validationsResult = loginValidations(email, password);

    if (typeof validationsResult === "string") {
      res.send({ message: validationsResult });
      return;
    }

    const userExistsResult = await users.get.byEmail(email);

    if (userExistsResult.length === 0) {
      res.send({ message: "Invalid email address!" });
      return;
    }

    const token = jwt.createToken({
      id: userExistsResult[0].id,
      email: userExistsResult[0].email,
      username: userExistsResult[0].username,
      first_name: userExistsResult[0].first_name,
      last_name: userExistsResult[0].last_name,
      role_as: userExistsResult[0].role_as,
    });

    res.send({ token });
  }),
  save: asyncHandler(async (req, res) => {
    const { first_name, last_name } = req.body;
    const id = req.user.id;

    if (!parseInt(id)) {
      res.send({ message: "Invalid id!" });
      return;
    }

    const userResult = await users.post.save(id, first_name, last_name);

    res.send({ affected_rows: userResult.affectedRows });
  }),
};

const get = {
  byId: asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!parseInt(id)) {
      res.send({ message: "Invalid id!" });
      return;
    }

    const userResult = await users.get.byId(id);

    if (userResult.length === 0) {
      res.send({ message: "Invalid id!" });
      return;
    }

    res.send(userResult[0]);
  }),
  user: asyncHandler(async (req, res) => {
    const id = req.user.id;

    if (!parseInt(id)) {
      res.send({ message: "Invalid id!" });
      return;
    }

    const userResult = await users.get.byId(id);

    if (userResult.length === 0) {
      res.send({ message: "Invalid id!" });
      return;
    }

    res.send(userResult[0]);
  }),
};

module.exports = {
  post,
  get,
};
