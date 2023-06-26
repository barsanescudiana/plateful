const authRouter = require('./auth')
const userRouter = require('./user')
const recipesRouter = require('./recipes')
const router = require('express').Router()

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/recipes', recipesRouter)

module.exports = router;
