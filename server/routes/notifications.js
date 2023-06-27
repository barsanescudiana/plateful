const notificationsController = require('../controllers/notifications');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth');

router.use(checkAuthorization);
router.get('/', notificationsController.getAllForMe);
router.delete('/:notificationId', notificationsController.delete);

module.exports = router;