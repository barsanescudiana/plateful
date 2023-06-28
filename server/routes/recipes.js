const recipesController = require('../controllers/recipes')
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth');

router.use(checkAuthorization);

router.get('/with-ingredients', recipesController.getRecipesByIngredients);
router.get('/from-db', recipesController.getRecipesFromBD)

module.exports = router;