const { accountsController } = require("../controllers");
const { validateRegis, validateToken } = require("../middleware/validation");
const router = require("express").Router();

// router.post("/", accountsController.addAccount);
// router.get("/", accountsController.getAccount);
// router.patch("/:id", accountsController.updateAccount);
// router.delete("/:id", accountsController.deleteAccount);

router.get("/", accountsController.getData);

router.post("/regis", validateRegis, accountsController.register);

router.post("/login", accountsController.login);

router.post("/forgot/pass", accountsController.forgotPass)

router.post("/reset/pass", accountsController.resetPass)

router.get("/keeplogin", validateToken, accountsController.keepLogin);

module.exports = router;