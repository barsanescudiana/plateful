const db = require('../database');
const firestore = require('firebase-admin').firestore;

const controller = { 
  getAll: async(req, res) => {
    let places = [];
    const response = await db.collection('places')
      .where("userId", '==', req.params.userId)
      .get();
    response.forEach(doc => {
      let place = {
        id: doc.id,
        name: doc.data().name,
        address: doc.data().address,
        type: doc.data().type,
        userId: req.params.userId,
      };
      places.push(place);
    });
    res.json(places);
  },

  addOne: async(req, res) => {
    let placeToAdd = req.body;
    const eventRef = db.collection('places');
    const eventAdded = await eventRef.add(placeToAdd);
      res.status(201).send({message: 'Place added successfully!', eventAdded: eventAdded});
  },
}

module.exports = controller;