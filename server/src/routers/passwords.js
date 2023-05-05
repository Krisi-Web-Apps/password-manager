const router = require("express").Router();

const { isAuth } = require("@src/config/middlewares");
const { passwordsController } = require("@src/controllers");

router.post("/", isAuth, passwordsController.post.insert);

module.exports = router;
