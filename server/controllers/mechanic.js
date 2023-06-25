const db = require('../database');
const faker = require('faker')

const controller = { 
  generateOne: async (req, res) => {
    let mechanic = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress()
    }

    res.send(mechanic)
  }
}

module.exports = controller;