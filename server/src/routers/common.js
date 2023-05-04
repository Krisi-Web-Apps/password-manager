const router = require("express").Router();
const { commonController } = require("@src/controllers");
const { isAuth } = require("@src/config/middlewares");

router.get("/", commonController.get.home);
router.get("/about", isAuth, commonController.get.about);

module.exports = router;
