const jwt = require('jsonwebtoken');
const secret = 'carctrl-secret';
const db = require('../database');


module.exports = checkAuthorization = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    // getAuth()
    //   .verifyIdToken(req.token)
    //   .then((decoded) => {
    //     req.parsedToken = decoded;
    //     next()
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(403).json({ "message": "Decoding error!" });
    //   })

    const decodedToken = jwt.decode(req.token);
    if (decodedToken) {
      req.decodedToken = decodedToken;
      const user = await db.collection('users').where('email', '==', decodedToken.email).get();
      if (!user.empty) {
        req.caller = { id: user.docs[0].id, ...user.docs[0].data() };
      }
      next();
    } else {
      res.status(403).json({ "message": "Decoding error!" });
    }

    // jwt.verify(req.token, secret, (err, decoded) => {
    //   if (err) {
    //     if (err.expiredAt) {
    //       res.status(403).json({ "message": "Your token expired!" });
    //     } else {
    //       console.log(err);
    //       res.status(403).json({ "message": "Decoding error!" });
    //     }
    //   } else {
    //     req.parsedToken = decoded;
    //     next();
    //   }
    // })
  } else {
    res.status(401).json({ "message": "Missing token!" })
  }
}