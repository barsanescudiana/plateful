const recipesController = require("../controllers/recipes");
const router = require("express").Router();
const checkAuthorization = require("../middleware/auth");

router.use(checkAuthorization);

router.get("/with-ingredients", recipesController.getRecipesByIngredients);
router.get("/from-db", recipesController.getRecipesFromBD);
router.get("/one", recipesController.getRecipeById);
router.get("/favorites", recipesController.getUserFavorites);
router.get("/perfect-match", recipesController.getPerfectMatch);
router.patch("/favorites", recipesController.addToFavorites);

module.exports = router;
