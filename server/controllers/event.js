const db = require('../database');
const firestore = require('firebase-admin').firestore;

const controller = { 
  getAll: async(req, res) => {
    let events = [];
    const response = await db.collection('events')
      .where("userId", '==', req.params.userId)
      .get();
    response.forEach(doc => {
      let event = {
        id: doc.id,
        name: doc.data().name,
        date: doc.data().date,
        licence: doc.data().carLicence,
        type: doc.data().type,
        person: doc.data().person,
        address: doc.data().address
      };
      events.push(event);
    });
    res.json(events);
  },

  addOne: async(req, res) => {
    let eventToAdd = req.body;
    eventToAdd.date = firestore.Timestamp.fromDate(new Date(req.body.date));
    const eventRef = db.collection('events');
    const eventAdded = await eventRef.add(eventToAdd);
      res.status(201).send({message: 'Car added successfully!', eventAdded: eventAdded});
  },

  getByDate: async (req, res) => {
    let events = [];
    const eventRef = db.collection('events');
    const doc = await eventRef
      .where('date', '==', new Date(req.params.date))
      .get();
    if (!doc.exists) {
      res.status(404).send('not found 😢')  
    } else {
      doc.forEach((event) => {
        events.push(event);
      })
      res.status(200).send(events)
    }
  }, 
}

module.exports = controller;