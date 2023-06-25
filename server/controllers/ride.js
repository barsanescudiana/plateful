const db = require('../database');
const firestore = require('firebase-admin').firestore;

const controller = { 
  getAll: async(req, res) => {
    let rides = [];
    const response = await db.collection('trips')
      .where("userId", '==', req.params.userId)
      .where("carId", '==', req.params.carId)
      .get();
    response.forEach(doc => {
      let ride = {
        id: doc.id,
        from: doc.data().from,
        to: doc.data().to,
        km: doc.data().km,
        date: new Date(doc.data().date._seconds*1000),
        carId: req.params.carId,
        userId: req.params.userId,
      };
      rides.push(ride);
    });
    res.json(rides);
  },

  getMostRecent: async (req, res) => {
    let last;
    const response = await db.collection('trips')
      .where("userId", '==', req.params.userId)
      .where("carId", '==', req.params.carId)
      .orderBy('date', 'desc')
      .limit(1)
      .get();
    response.forEach(doc => {
      last = new Date(doc.data().date._seconds*1000)
    });

    if (last) {
      res.send(last)
    } else {
      res.status(404).send()
    }

  },

  addOne: async(req, res) => {
    let rideToAdd = req.body;
    const ridesRef = db.collection('trips');
    rideToAdd.date = firestore.Timestamp.fromDate(new Date(req.body.date));
    const rideAdded = await ridesRef.add(rideToAdd);
    res.status(201).send({message: 'Ride added successfully!', rideAdded: rideAdded});
    
  },
}

module.exports = controller;