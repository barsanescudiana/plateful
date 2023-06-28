const axios = require("axios");
const db = require("../database");

const controller = {
  getRecipesByIngredients: async (req, res) => {
    const user = req.caller.id;

    let ingredients = "";

    if (user) {
      const products = user.products;
      products.forEach((product) => {
        ingredients += product.name.toLowerCase() + ",";
      });
    }

    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      params: {
        ingredients: ingredients.replace(/.$/, ""),
        number: "10",
        ignorePantry: "true",
        ranking: "1",
      },
      headers: {
        "X-RapidAPI-Key": "5dec463cf3msh5bac39035b93bbdp17a97ejsn90be7f1d830e",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    try {
      let recipesToSend = [];
      const response = await axios.request(options);
      response.data.forEach(async (recipe) => {
        recipe.usedIngredients.forEach((ingredient) => {
          if (
            ingredient.name.toLowerCase() === req.query.ingredient.toLowerCase()
          ) {
            recipesToSend.push(recipe);
          } else if (
            ingredient.name
              .toLowerCase()
              .includes(req.query.ingredient.toLowerCase())
          ) {
            recipesToSend.push(recipe);
          }
        });
      });
      res.status(200).send(recipesToSend);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getRecipesFromBD: async (req, res) => {
    const recipesRef = db.collection("recipes");
    const recipes = await recipesRef.get();

    let recipesToSend = [];

    recipes.forEach((recipe) => {
      recipesToSend.push(recipe.data());
    });
    res.status(200).send(recipesToSend);
  },
};

module.exports = controller;
