const db = require("../database");

const controller = {
  getAllForMe: async (req, res) => {
    console.log(req);
    res.status(200).send(req.parsedToken);
  }
};

module.exports = controller;
