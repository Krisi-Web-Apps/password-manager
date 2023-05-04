const router = require("express").Router();

const { isAuth, isAdmin } = require("@src/config/middlewares");
const { usersController } = require("@src/controllers");

router.get("/", isAuth, usersController.get.user);
router.get("/items", isAuth, isAdmin, usersController.get.items);
router.get("/:id", isAuth, isAdmin, usersController.get.byId);

router.post("/", isAuth, usersController.post.save);
router.post("/register", usersController.post.register);
router.post("/login", usersController.post.login);
router.post("/change-email", isAuth, usersController.post.changeEmail);

module.exports = router;
