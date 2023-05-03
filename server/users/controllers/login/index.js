const asyncHandler = require("express-async-handler");

const services = require("../../services");
const { passwordVerify, createToken, tokenEncrypt } = require("../../../utils");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await services.byEmail(email);

    if (result.length === 0) {
        res.send({ message: "Invalid email address!" });
        return;
    }

    const isValid = passwordVerify(password, result[0].password);

    if (!isValid) {
        res.send({ message: "Invalid password!" });
        return;
    }

    const tokenData = {
        id: result[0].id,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        email: result[0].email,
    }

    const token = createToken(tokenData);

    const tokenHash = tokenEncrypt(token);

    res.send({
        token: tokenHash
    });
});

module.exports = login;
