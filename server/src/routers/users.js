const router = require("express").Router();
const { usersController } = require("@src/controllers");

router.post("/register", usersController.post.register);

module.exports = router;
