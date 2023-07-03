const productController = require("../controllers/product");
const router = require("express").Router();
const checkAuthorization = require("../middleware/auth");

router.use(checkAuthorization);

router.get("/barcode", productController.getProductByBarcode);

module.exports = router;
