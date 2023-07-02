const axios = require("axios");
const db = require("../database");

const controller = {
  getRecipesByIngredients: async (req, res) => {
    const user = req.caller;

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
        number: "5",
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

  addToFavorites: async (req, res) => {
    const recipeId = req.body.recipeId;
    const recipesRef = db.collection("recipes");
    const recipes = await recipesRef.get();

    const userRef = db.collection("users").doc(req.caller.id);
    const user = await userRef.get();

    let newSavedRecipes = [];

    if (user.exists) {
      newSavedRecipes = user.data().savedRecipes;
    }

    if (recipeId) {
      const options = {
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
        params: {
          includeNutrition: "true",
        },
        headers: {
          "X-RapidAPI-Key":
            "5dec463cf3msh5bac39035b93bbdp17a97ejsn90be7f1d830e",
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);

        if (response.data) {
          recipesRef.add({
            ...response.data,
            userId: req.caller.id,
            isFavorite: true,
          });

          newSavedRecipes.push({
            ...response.data,
            isFavorite: true,
          });

          userRef.update({
            savedRecipes: newSavedRecipes,
          });

          res.status(200).json("Added to favorites");
        } else {
          res.status(404).json("Recipe not found!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  },

  getPerfectMatch: async (req, res) => {
    const user = req.caller;

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
        number: "100",
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
        if (recipe.missedIngredients.length === 0) {
          recipesToSend.push(recipe);
        }
      });
      res.status(200).send(recipesToSend);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getUserFavorites: async (req, res) => {
    const userRef = db.collection("users").doc(req.caller.id);
    const user = await userRef.get();

    if (user.exists) {
      if (user.data().savedRecipes.length) {
        res.status(200).json(user.data().savedRecipes);
      } else {
        res.status(203).json("You don't have any favorite recipes saved yet!");
      }
    } else {
      res.status(404).json("User not found");
    }
  },

  getRecipeById: async (req, res) => {
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.query.recipeId}/information`,
      headers: {
        "X-RapidAPI-Key": "5dec463cf3msh5bac39035b93bbdp17a97ejsn90be7f1d830e",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.status(200).send(response.data);
    } catch (error) {
      // res.status(400).send(error);
      console.log(error);
    }
  },
};

module.exports = controller;
