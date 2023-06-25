const mechanicController = require('../controllers/mechanic');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth')

router.get('/generate', checkAuthorization, mechanicController.generateOne);

module.exports = router;