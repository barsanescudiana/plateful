const userController = require("../controllers/user");
const router = require("express").Router();
const checkAuthorization = require("../middleware/auth");

router.use(checkAuthorization);

router.get("/shopping/get-list", userController.getShoppingListData);
router.get("/products/all", userController.getProducts);
router.get("/products/:productId", userController.getProductById);
router.get("/", userController.getUserById);
router.patch("/edit/shopping-list", userController.updateShoppingList);
router.patch("/products/add", userController.updateProductsList);

module.exports = router;
