const friendsController = require('../controllers/friends');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth');

router.use(checkAuthorization);

router.get('/suggestions', friendsController.getSuggestions);
router.post('/send-request', friendsController.sendRequest);
router.patch('/accept', friendsController.accept);
router.get('/all-users', friendsController.getAllUsersExceptMe);
router.get('/products', friendsController.getProducts);
router.post('/:claimeeId/products/claim', friendsController.claim);
router.patch('/:claimerId/accept-claim', friendsController.acceptClaim);

module.exports = router;