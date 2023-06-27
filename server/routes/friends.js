const friendsController = require('../controllers/friends');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth');

router.use(checkAuthorization);

router.get('/suggestions', friendsController.getSuggestions);
router.post('/send-request', friendsController.sendRequest);
router.patch('/accept', friendsController.accept);

module.exports = router;