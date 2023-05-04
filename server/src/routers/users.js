const router = require("express").Router();

const { isAuth, isAdmin } = require("@src/config/middlewares");
const { usersController } = require("@src/controllers");

router.get("/:id", isAuth, isAdmin, usersController.get.byId);

router.post("/register", usersController.post.register);
router.post("/login", usersController.post.login);

module.exports = router;
