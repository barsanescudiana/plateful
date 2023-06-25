const authRouter = require('./auth')
const userRouter = require('./user')

const router = require('express').Router()

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
