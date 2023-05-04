const asyncHandler = require("express-async-handler");

const { users } = require("@src/services");
const registerValidations = require("@src/validations/registerValidations");
const { bcrypt } = require("@src/utils");

const post = {
  register: asyncHandler(async (req, res) => {
    const { first_name, last_name, username, email, password, cpassword } = req.body;

    const validationsResult = registerValidations(first_name, last_name, username, email, password, cpassword);

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

    const userInsertResult = await users.post.insert(first_name, last_name, username, email, passwordHash);

    res.send({ affected_rows: userInsertResult.affectedRows });
  }),
};

module.exports = {
  post,
};
