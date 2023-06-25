const db = require('../database');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const firestore = require('firebase-admin').firestore;

const controller = { 
  getAll: async(req, res) => {
    let cars = [];
    const response = await db.collection('cars')
      .where("userId", '==', req.params.userId)
      .get();
    response.forEach(doc => {
      let car = {
        id: doc.id,
        brand: doc.data.brand,
        model: doc.data.model,
        color: doc.data.color,
        licence: doc.data.licence.trim(),
        rca: new Date(doc.data.rca._seconds*1000),
        itp: new Date(doc.data.itp._seconds*1000),
        tankCapacity: doc.data.tankCapacity,
        fuel: doc.data.fuel,
        engineOutput: doc.data.engineOutput,
        engineOutputMeasure: doc.data.engineOutputMeasure,
        avgConspumtion: doc.data.avgConspumtion,
        km: doc.data.km
      };
      cars.push(car);
    });
    res.json(cars);
  },

  getRecent: async(req, res) => {
    let cars = [];
    const response = await db.collection('cars').limit(3)
      .where("userId", '==', req.params.userId)
      .get();
    response.forEach(doc => {
      let car = {
        id: doc.id,
        brand: doc.data().brand,
        model: doc.data().model,
        color: doc.data().color,
        licence: doc.data().licence.trim(),
        rca: new Date(doc.data().rca._seconds*1000),
        itp: new Date(doc.data().itp._seconds*1000),
        tankCapacity: doc.data().tankCapacity,
        fuel: doc.data().fuel,
        engineOutput: doc.data().engineOutput,
        engineOutputMeasure: doc.data().engineOutputMeasure,
        avgConsumption: doc.data().avgConsumption,
        km: doc.data().km
      };
      cars.push(car);
    });
    res.json(cars);
  },

  addOne: async(req, res) => {
    let carExists = false;
    let carToAdd = req.body;
    const carRef = db.collection('cars');
    const snapshot = await carRef
      .where('licence', '==', carToAdd.licence)
      .get();
    if (!snapshot.empty) {
      carExists = true;
    }

    if (carExists) {
      res.status(404).send('Car already added! You cannot add more cars with the same licence plate!');
    } else {
      carToAdd.itp = firestore.Timestamp.fromDate(new Date(carToAdd.itp))
      carToAdd.rca = firestore.Timestamp.fromDate(new Date(carToAdd.rca))
      const carAdded = await carRef.add(carToAdd);
      res.status(201).send({message: 'Car added successfully!', carAdded: carAdded});
    }
  },

  getByLicencePlate: async (req, res) => {
    const carRef = db.collection('cars');
    await carRef
      .where('licence', '==', req.params.licence)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            res.status(200).send(doc.data())
          })
        } else {
          res.status(404).send('not found 😢')  
        }
      });
  },

  getById: async (req, res) => {
    const carRef = db.collection('cars').doc(req.params.id);
    const doc = await carRef.get();
    if (!doc.exists) {
      res.status(404).send('not found 😢')  
    } else {
      res.status(200).send(doc.data())
    }
  }, 

  updateKmById: async (req, res) => {
    const docRef = db.collection('cars').doc(req.body.id);
    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.update({
        km: FieldValue.increment(req.body.km)
      })
      const updated = await docRef.get();
      res.status(202).send(updated.data());
    } else {
      res.status(404).send('not found 😢');
    }
  },

  deleteByLicence: async(req, res) => {
    let remainingCars = [];
    const docRef = db.collection('cars');
    await docRef
      .where('licence', '==', req.body.licence)
      .get()
      .then((doc) => {
        if (!doc.empty) {
          doc.forEach((car) => {
            remainingCars.push(car.data());
          })
          res.status(202).send(remainingCars);
        } else {
          res.status(404).send();
        }
      });
  },

  getByUserId: async (req, res) => {
    let cars = [];
    const docRef = db.collection('cars');
    await docRef
      .where('userId', '==', req.params.userId)
      .get()
      .then((doc) => {
        if(!doc.empty) {
          doc.forEach((car) => {
            cars.push(car.data());
          })
          res.status(202).send(cars);
        } else {
          res.status(404).send('not found');
        }
      })
  },

  getAllLicencePlates: async (req, res) => {
    let response = [];
    const docRef = db.collection('cars');
    await docRef
      .where('userId', '==', req.params.userId)
      .get()
      .then((doc) => {
        if(!doc.empty) {
          doc.forEach((car) => {
            response.push({
              licence: car.data().licence,
              id: car.id
            })

          })
          res.status(202).send(response);
        } else {
          res.status(404).send('not found');
        }
      })
  },

  updateDate: async (req, res) => {
    const docRef = db.collection('cars').doc(req.body.carId);
    const doc = await docRef.get()
    if(doc.exists) {
      if (req.body.rca) {
        await docRef.update({
          rca: firestore.Timestamp.fromDate(new Date(req.body.rca))
        })
      } else {
        await docRef.update({
          itp: firestore.Timestamp.fromDate(new Date(req.body.itp))
        })
      }
      const updated = await docRef.get();
      res.status(202).send(updated.data());
    } else {
      res.status(404).send('not found');
    }
      
  }

}

module.exports = controller;