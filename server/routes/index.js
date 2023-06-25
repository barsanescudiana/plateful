const authRouter = require('./auth')
const carRouter = require('./car')
const eventRouter = require('./event')
const mechanicRouter = require('./mechanic')
const placeRouter = require('./place')
const rideRouter = require('./ride')
const userRouter = require('./user')

const router = require('express').Router()

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
