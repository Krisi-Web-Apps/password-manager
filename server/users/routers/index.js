const router = require("express").Router();
const { isAuth } = require("../../config/middlewares");

router.get("/", isAuth, require("../controllers").fetchItems);

router.post("/login", require("../controllers").login);
router.post("/register", require("../controllers").register);
router.post("/change-password", isAuth, require("../controllers").changePassword);
router.post("/change-email", isAuth, require("../controllers").changeEmail);
router.post("/", isAuth, require("../controllers").updateUserById);

module.exports = router;
