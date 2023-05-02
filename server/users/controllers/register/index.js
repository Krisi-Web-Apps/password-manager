const validations = require("../../validations");

const register = (req, res) => {
    const { username, email, password, cpassword, ...others } = req.body;

    const result = validations.register(username, email, password, cpassword);

    if (typeof result === "string") {
        // The error message in result.
        res.send({ message: result });
        return;
    }

    res.send({ username, email, password, cpassword, ...others });
}

module.exports = register;
