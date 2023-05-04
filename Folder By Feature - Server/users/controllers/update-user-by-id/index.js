const asyncHandler = require("express-async-handler");

const services = require("../../services");

const updateUserById = asyncHandler(async (req, res) => {
    const { first_name, last_name } = req.body;
    const user = req.user;

    const result = await services.byEmail(user.email);

    if (result.length === 0) {
        res.send({ message: "Invalid email address!" });
        return;
    }

    const updatedUserResult = await services.updateUserById(user.id, { first_name, last_name });
    res.send({ affectedRows: updatedUserResult.affectedRows });
});

module.exports = updateUserById;