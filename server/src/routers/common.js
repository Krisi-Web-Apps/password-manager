const router = require("express").Router();
const { commonController } = require("@src/controllers");

router.get("/", commonController.get.home);
router.get("/about", commonController.get.about);

module.exports = router;
