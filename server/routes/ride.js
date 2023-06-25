const rideController = require('../controllers/ride');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth')

router.get('/last/:userId/:carId', checkAuthorization, rideController.getMostRecent)
router.get('/all/:userId/:carId', checkAuthorization, rideController.getAll);
router.post('/addOne', checkAuthorization, rideController.addOne);

module.exports = router;