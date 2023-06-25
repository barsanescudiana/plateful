const authController = require('./auth');
const carController = require('./car');
const eventController = require('./event');
const placeController = require('./place')
const rideController = require('./ride');
const mechanicController = require('./mechanic');

const controllers = {
  authController,
  carController,
  eventController,
  placeController,
  rideController,
  mechanicController,
}

module.exports = controllers;