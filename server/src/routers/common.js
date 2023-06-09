const router = require("express").Router();
const { commonController } = require("../controllers");
const { isAuth, isAdmin } = require("../config/middlewares");

router.get("/", commonController.get.home);
router.get("/about", commonController.get.about);
router.get("/for-auth", isAuth, commonController.get.forAuth);
router.get("/for-admin", isAuth, isAdmin, commonController.get.forAdmin);

module.exports = router;
