const authRouter = require('./auth')
const userRouter = require('./user')
const recipesRouter = require('./recipes');
const notificationsRouter = require('./notifications');
const friendsRouter = require('./friends');
const router = require('express').Router()

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/recipes', recipesRouter);
router.use('/notifications', notificationsRouter);
router.use('/friends', friendsRouter);

module.exports = router;
