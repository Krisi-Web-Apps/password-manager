const services = require("../../services");
const asyncHandler = require("express-async-handler");

const fetchItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!parseInt(id)) {
        res.send({ message: "Invalid id!" });
        return;
    }
    
    const userResult = await services.fetchItemById(id);

    if (userResult.length === 0) {
        res.send({ message: "Invalid id!" });
        return;
    }

    res.send(userResult[0]);
});

module.exports = fetchItemById;