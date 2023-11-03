const { productsController } = require("../controllers");
const router = require("express").Router();

router.get("/", productsController.getData);
router.post("/add", productsController.addProduct)

module.exports = router;