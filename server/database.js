
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getDatabase } = require('firebase-admin/database')

const serviceAccount = require("./credentials/credentials.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;
