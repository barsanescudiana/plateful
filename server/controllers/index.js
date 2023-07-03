const authController = require("./auth");
const mechanicController = require("./mechanic");
const recipesController = require("./recipes");
const notificationsController = require("./notifications");
const productController = require("./product");

const controllers = {
  authController,
  mechanicController,
  recipesController,
  notificationsController,
  productController,
};

module.exports = controllers;
