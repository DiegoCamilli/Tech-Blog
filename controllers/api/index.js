const express = require('express')
const router = express.Router()

const postRoutes = require('./postRoutes')
const commentRoutes = require('./commentRoutes')
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const loginRoutes = require('./loginRoutes')
const signupRoutes = require('./signupRoutes')

router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)
router.use('/home', homeRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/login', loginRoutes)
router.use('/signup', signupRoutes)

module.exports = router