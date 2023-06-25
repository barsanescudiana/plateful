const placeController = require('../controllers/place');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth')

router.get('/all/:userId', checkAuthorization, placeController.getAll);
router.post('/addOne', checkAuthorization, placeController.addOne);

module.exports = router;