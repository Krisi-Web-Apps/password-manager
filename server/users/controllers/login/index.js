const validations = require("../../validations");

const login = (req, res) => {
    const { email, password } = req.body;

    const result = validations.login(email, password);

    if (typeof result === "string") {
        // The error message in result.
        res.send({ message: result });
        return;
    }

    res.send({ email, password });
}

module.exports = login;
