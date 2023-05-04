const asyncHandler = require("express-async-handler");

const services = require("../../services");

const fetchItems = asyncHandler(async (req, res) => {
    const usersResult = await services.fetchItems();
    res.send(usersResult);
});

module.exports = fetchItems;
