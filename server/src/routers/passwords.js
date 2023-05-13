const router = require("express").Router();

const { isAuth, isAdmin } = require("../config/middlewares");
const { passwordsController } = require("../controllers");

router.get("/items", isAuth, isAdmin, passwordsController.get.items);
router.get("/my", isAuth, passwordsController.get.byLoggedInUser);
router.get("/my/:id", isAuth, passwordsController.get.byIdByLoggedUser);

router.post("/", isAuth, passwordsController.post.insert);

router.delete("/my/:id", isAuth, passwordsController.del.byId);

module.exports = router;
