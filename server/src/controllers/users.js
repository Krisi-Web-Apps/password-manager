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
};

module.exports = {
  post,
};
