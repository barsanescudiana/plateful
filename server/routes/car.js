const carController = require('../controllers/car');
const router = require('express').Router();
const checkAuthorization = require('../middleware/auth')

router.get('/:licence', checkAuthorization, carController.getByLicencePlate);
router.get('/one/:id', checkAuthorization, carController.getById);
router.get('/recent/:userId', checkAuthorization, carController.getRecent);
router.get('/all/:userId', checkAuthorization, carController.getByUserId);
router.get('/licences/:userId', checkAuthorization, carController.getAllLicencePlates);

router.post('/addOne', checkAuthorization, carController.addOne);

router.patch('/edit/km', checkAuthorization, carController.updateKmById);
router.patch('/updateDate', checkAuthorization, carController.updateDate);

module.exports = router;