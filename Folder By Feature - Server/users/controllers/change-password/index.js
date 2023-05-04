const asyncHandler = require("express-async-handler");

const services = require("../../services");
const { passwordVerify, createToken, passwordHash } = require("../../../utils");
const validations = require("../../validations");

const changePassword = asyncHandler(async (req, res) => {
    const { old_password, new_password, cnew_password } = req.body;
    const user = req.user;

    const errorMessage = validations.changePassword(new_password, cnew_password);

    if (typeof errorMessage === "string") {
        res.send({ message: errorMessage });
        return;
    }
    
    {
        const result = await services.byEmail(user.email);

        console.log(result);

        if (result.length === 0) {
            res.send({ message: "Invalid email address!" });
            return;
        }

        const isValid = passwordVerify(old_password, result[0].password);

        if (!isValid) {
            res.send({ message: "Invalid current password!" });
            return;
        }

        const hash = passwordHash(new_password);

        const updatedUserResult = await services.updatePasswordByEmail(user.email, hash);
        res.send({
            affected_rows: updatedUserResult.affectedRows
        });
    }
});

module.exports = changePassword;
