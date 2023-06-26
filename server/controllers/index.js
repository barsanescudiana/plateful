const authController = require('./auth');
const mechanicController = require('./mechanic');
const recipesController = require('./recipes')

const controllers = {
  authController,
  mechanicController,
  recipesController
}

module.exports = controllers;