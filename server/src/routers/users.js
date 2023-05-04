const router = require("express").Router();
const { usersController } = require("@src/controllers");

router.post("/register", usersController.post.register);
router.post("/login", usersController.post.login);

module.exports = router;
