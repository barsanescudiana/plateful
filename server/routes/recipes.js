const recipesController = require('../controllers/recipes')
const router = require('express').Router();

router.get('/with-ingredients', recipesController.getRecipesByIngredients);
router.get('/from-db', recipesController.getRecipesFromBD)

module.exports = router;