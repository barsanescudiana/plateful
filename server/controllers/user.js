const db = require("../database");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const firestore = require("firebase-admin").firestore;
const Timestamp = require("firebase-admin").firestore.Timestamp;

const controller = {
  getShoppingListData: async (req, res) => {
    const docRef = db.collection("users").doc(req.caller.id);
    const userData = await docRef.get();

    if (userData.exists) {
      res.status(200).send(userData.data().shoppingListItems);
    } else {
      res.status(404).send("not found 😢");
    }
  },

  updateShoppingList: async (req, res) => {
    const docRef = db.collection("users").doc(req.caller.id);
    const userToUpdate = await docRef.get();

    let response = {};

    if (userToUpdate.exists) {
      await docRef.update({
        shoppingListItems: req.body.shoppingList,
      });
      const updated = await docRef.get();
      if (updated.exists) {
        const user = {
          id: docRef.id,
          ...updated.data(),
        };
        response = user;
        res.status(202).send(response);
      } else {
        res.status(404).send("not found 😢");
      }
    } else {
      res.status(404).send("not found 😢");
    }
  },

  updateProductsList: async (req, res) => {
    const product = req.body.product;
    product.expirationDate = Timestamp.fromDate(
      new Date(product.expirationDate)
    );

    const productsDB = db.collection("products");

    let productId = "";

    await productsDB
      .add({
        userId: req.caller.id,
        ...product,
        dateAdded: Timestamp.fromDate(new Date()),
      })
      .then((docRef) => {
        productId = docRef.id;
      });

    const userRef = await db.collection("users").doc(req.caller.id);
    const user = await userRef.get();
    if (user.exists) {
      newProductsArray = user.data().products;
      newProductsArray.push({
        id: productId || "",
        ...product,
        dateAdded: Timestamp.fromDate(new Date()),
      });

      let updatedUser = await userRef.update({ products: newProductsArray });
      res.status(200).send({ message: "Added" });
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  },

  getProducts: async (req, res) => {
    const user = req.caller;

    if (user) {
      products = user.products;
      products.forEach((product) => {
        product.expirationDate = product.expirationDate.toDate();
      });
      res.status(200).send(products);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  },

  getProductById: async (req, res) => {
    const user = req.caller;

    if (user) {
      products = user.products;

      products.forEach((product) => {
        if (product.id === req.params.productId) {
          response = product;
          response.expirationDate = product.expirationDate.toDate();
          response.dateAdded = product.dateAdded.toDate();
        }
      });

      console.log(response);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(400).send({});
      }
    } else {
      res.status(404).send({});
    }

    console.log(req.params.productId);
  },

  //internal
  getPublicInfoById: async (userId) => {
    const user = await db.collection("users").doc(userId).get();
    if (user.exists) {
      const u = user.data();
      return {
        id: user.id,
        firstName: u.firstName,
        lastName: u.lastName,
        picture: u.picture,
      };
    }
  },

  getUserById: async (req, res) => {
    const userRef = await db.collection("users").doc(req.query.userId);
    const user = await userRef.get();

    if (user.exists) {
      res.status(200).send(user.data());
    } else {
      res.status(404).send({ message: "not found" });
    }
  },

  getMySettings: async (req, res) => {
    const user = await db.collection('users').doc(req.caller.id).get();

    if (user.exists) {
      res.status(200).json(user.data().settings);
    } else {
      res.status(404).json({ 'message': 'User not found' });
    }
  }
};

module.exports = controller;
