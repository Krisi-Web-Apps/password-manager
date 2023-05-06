const asyncHandler = require("express-async-handler");

const { users } = require("@src/services");
const usersValidations = require("@src/validations/users");
const { bcrypt, jwt, cryptojs } = require("@src/utils");

const post = {
  register: asyncHandler(async (req, res) => {
    const { first_name, last_name, username, email, password, cpassword } =
      req.body;

    const validationsResult = usersValidations.register(
      first_name,
      last_name,
      username,
      email,
      password,
      cpassword
    );

    if (typeof validationsResult === "string") {
      res.status(400).send({ message: validationsResult });
      return;
    }

    const userUsernameResult = await users.get.byUsername(email);

    if (userUsernameResult.length > 0) {
      res.status(400).send({ message: "Dublicate username!" });
      return;
    }

    const userEmailResult = await users.get.byEmail(email);

    if (userEmailResult.length > 0) {
      res.status(400).send({ message: "Dublicate email address!" });
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

    const validationsResult = usersValidations.login(email, password);

    if (typeof validationsResult === "string") {
      res.status(400).send({ message: validationsResult });
      return;
    }

    const userExistsResult = await users.get.byEmail(email);

    const userPasswordResult = await users.get.password(userExistsResult[0].id);

    if (userExistsResult.length === 0) {
      res.status(400).send({ message: "Invalid email or password!" });
      return;
    }

    const isValid = bcrypt.verify(password, userPasswordResult[0].password);

    if (!isValid) {
      res.status(400).send({ message: "Invalid email or password!" });
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

    const encryptedToken = cryptojs.encryptData(token);

    res.send({ encryptedToken });
  }),
  save: asyncHandler(async (req, res) => {
    const { first_name, last_name } = req.body;
    const id = req.user.id;

    if (!parseInt(id)) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    const userResult = await users.post.save(id, first_name, last_name);

    res.send({ affected_rows: userResult.affectedRows });
  }),
  changeEmail: asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { new_email, cnew_email } = req.body;

    const validationsResult = usersValidations.changeEmail(
      new_email,
      cnew_email
    );

    if (typeof validationsResult === "string") {
      res.status(400).send({ message: validationsResult });
      return;
    }

    const userResult = await users.get.byId(id);

    if (userResult.length === 0) {
      res.status(400).send({ message: "Invalid email address!" });
      return;
    }

    const savedUserResult = await users.post.changeEmail(id, new_email);

    res.send({ affected_rows: savedUserResult.affectedRows });
  }),
  changePassword: asyncHandler(async (req, res) => {
    const user = req.user;
    const { old_password, new_password, cnew_password } = req.body;

    const validationsResult = usersValidations.changePassword(new_password, cnew_password);

    if (typeof validationsResult === "string") {
      res.status(400).send({ message: validationsResult });
      return;
    }

    const userResult = await users.get.password(user.id);

    if (userResult.length === 0) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    const isValid = bcrypt.verify(old_password, userResult[0].password);

    if (!isValid) {
      res.status(400).send({ message: "Invalid current password!" });
      return;
    }

    const hash = bcrypt.hash(new_password);

    const savedUserPassword = await users.post.changePassword(user.id, hash);

    res.send({ affected_rows: savedUserPassword.affectedRows });
  }),
};

const get = {
  byId: asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!parseInt(id)) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    const userResult = await users.get.byId(id);

    if (userResult.length === 0) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    res.send(userResult[0]);
  }),
  user: asyncHandler(async (req, res) => {
    const id = req.user.id;

    if (!parseInt(id)) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    const userResult = await users.get.byId(id);

    if (userResult.length === 0) {
      res.status(400).send({ message: "Invalid id!" });
      return;
    }

    res.send(userResult[0]);
  }),
  items: asyncHandler(async (req, res) => {
    const usersResult = await users.get.items();
    res.send(usersResult);
  }),
  searchBy: asyncHandler(async (req, res) => {
    const query = req.query;

    const column = Object.keys(query)[0];
    const term = Object.values(query)[0];

    if (column === "password" || column === "created_at") {
      res.status(400).send({ message: "Invalid column!" });
      return;
    }

    const usersResult = await users.get.searchBy(column, term);

    res.send(usersResult);
  })
};

module.exports = {
  post,
  get,
};
