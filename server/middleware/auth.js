const jwt = require('jsonwebtoken')
const secret = 'carctrl-secret';


module.exports = checkAuthorization = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          res.json({ "message": "Your token expired!" });
        } else {
          res.json({ "message": "Decoding error!" });
        }
      } else {
        next();
      }
    })
  } else {
    res.json({ "message": "Missing token!" })
  }
}