const authController = require('./auth');
const mechanicController = require('./mechanic');
const recipesController = require('./recipes')
const notificationsController = require('./notifications');

const controllers = {
  authController,
  mechanicController,
  recipesController,
  notificationsController,
}

module.exports = controllers;