const userController = require("../controllers/user");
const router = require("express").Router();
const checkAuthorization = require("../middleware/auth");

router.use(checkAuthorization);

router.get("/shopping/get-list", userController.getShoppingListData);
router.get("/products/all", userController.getProducts);
router.get("/products/:productId", userController.getProductById);
router.get("/", userController.getUserById);
router.get('/settings/me', userController.getMySettings);
router.patch('/settings/me', userController.patchMySettings);
router.get("/friends", userController.getFriends);
router.patch("/edit/shopping-list", userController.updateShoppingList);
router.patch("/products/add", userController.updateProductsList);
router.patch("/products/share", userController.shareProduct);
router.patch("/products/delete", userController.deleteProduct);

module.exports = router;
