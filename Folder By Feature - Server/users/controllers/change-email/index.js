const asyncHandler = require("express-async-handler");

const validations = require("../../validations");
const services = require("../../services");

const changeEmail = asyncHandler(async (req, res) => {
    const { new_email, cnew_email } = req.body;
    const user = req.user;

    const isValid = validations.changeEmail(new_email, cnew_email);

    if (!isValid) {
        res.send({ message: "Invalid email address!" });
        return;
    }

    {
        const result = await services.byEmail(user.email);

        if (result.length === 0) {
            res.send({ message: "Invalid email address!" });
            return;
        }
    }

    const updatedUserResult = await services.updateEmailById(user.id, new_email);
    res.send({
        affected_rows: updatedUserResult.affectedRows
    });
});

module.exports = changeEmail;
