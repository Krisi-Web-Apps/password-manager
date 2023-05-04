const router = require("express").Router();
const { isAuth, isAdmin } = require("../../config/middlewares");

router.get("/", isAuth, isAdmin, require("../controllers").fetchItems);
router.get("/:id", isAuth, require("../controllers").fetchItemById);

router.post("/login", require("../controllers").login);
router.post("/register", require("../controllers").register);
router.post("/change-password", isAuth, require("../controllers").changePassword);
router.post("/change-email", isAuth, require("../controllers").changeEmail);
router.post("/", isAuth, require("../controllers").updateUserById);

module.exports = router;
