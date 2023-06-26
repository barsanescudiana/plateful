const db = require('../database');
const getAuth = require('firebase-admin/auth').getAuth;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const secret = 'carctrl-secret';

const controller = {
  register: async (req, res) => {
    let data = req.body;
    let emailExist = false;

    const userRef = db.collection('users');
    const snapshot = await userRef
      .where('email', '==', data.email)
      .get();
    if (!snapshot.empty) {
      emailExist = true;
    };

    if (emailExist) {
      res.send('User already registered.')
    }
    else {
      bcrypt.hash(data.password, saltRounds).then(async (hash) => {
        data.password = hash;
        const user = await db.collection('users').add(data);
        res.send('Successful registration');
      });
    }
  },
  
  login: async (req, res) => {
    let data = req.body;
    let emailFound = false;
    const usersRef = db.collection('users');
    const snapshot = await usersRef
      .where('email', '==', data.email)
      .get();
    let response = {};

    if (snapshot.empty) {
      response.message = "No such email address.";
      res.send(response);
    } else {
      emailFound = true;
      snapshot.forEach(doc => {
        bcrypt.compare(
          data.password, 
          doc.data().password)
          .then(async (result) => {
            if (result) {
              let token = jwt.sign({
                email: doc.data().email
              }, secret);

              const user = {
                id: doc.id,
                ...doc.data(),
              }
              response.token = token;
              response.user = user;
              response.message = 'You have the right to access private resources'

              res.send(response);
            }
            else {
              response.message = "Password missmatch";
              res.send(response)
            }
          });
        }
      );
    }
  },

  googleLogin: async (req, res) => {
    try {
      const credentials = req.body.credentials;
      const userData = jwt.decode(credentials)
  
      const usersRef = db.collection('users');
      const snapshot = await usersRef
        .where('email', '==', userData.email)
        .get();
      let response = {};
      response.token = credentials;
      console.log(snapshot);
    
      if (snapshot.empty) {
        const user = {
          firstName: userData.given_name,
          lastName: userData.family_name,
          picture: userData.picture,
          email: userData.email,
          phoneNumber: '',
          savedRecipes: [],
          friends: [],
          products: [],
          shoppingListItems: []
        }
        const newUser = await usersRef.add(user);
        response.user = (await newUser.get()).data();
      } else {
        snapshot.docs.forEach((doc) => {
          const user = {
            id: doc.id,
            ...doc.data(),
          }
          response.user = user;
        })
        response.message = "Good email!";
  
      }
      res.status(200).send(response);
    }
    catch(error) {
      res.status(500).send(error.message)
    }; 

    }
}

module.exports = controller;