const eventController = require('../controllers/event');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth')

router.get('/:date', checkAuthorization, eventController.getByDate);
router.get('/all/:userId', checkAuthorization, eventController.getAll);
router.post('/addOne', checkAuthorization, eventController.addOne);

module.exports = router;