const asyncHandler = require("express-async-handler");

const validations = require("../../validations");
const services = require("../../services");
const { passwordHash } = require("../../../utils");

const register = asyncHandler(async (req, res) => {
    const { username, email, password, cpassword, first_name, last_name } = req.body;

    {
        const result = validations.register(username, email, password, cpassword);
        if (typeof result === "string") {
            // The error message in result.
            res.send({ message: result });
            return;
        }
    }

    {
        const result = await services.byUsername(username);
        if (result.length !== 0) {
            res.send({ message: "Dublidate username!" });
            return;
        }
    }

    {
        const result = await services.byEmail(email);
        if (result.length !== 0) {
            res.send({ message: "Dublidate email address!" });
            return;
        }
    }

    const hash = passwordHash(password);
    await services.register(username, email, hash, first_name, last_name);

    {
        const result = await services.byEmail(email);
        res.send({ ...result[0] });
    }
});

module.exports = register;
