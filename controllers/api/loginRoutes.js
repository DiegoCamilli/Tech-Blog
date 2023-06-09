const express = require('express')
const router = express.Router()
const { User } = require('../../models')
const bcrypt = require('bcrypt')

// GET the login page
router.get('/', (req, res) => {
  res.render('login')
})

// POST route to handle user login
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body

    // Check if the user exists in the database
    const user = await User.findOne({ where: { username } })

    if (!user) {
      res.status(400).render('login', { errorMessage: 'Invalid username or password' })
      return
    }

    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      res.status(400).render('login', { errorMessage: 'Invalid username or password' })
      return
    }

    // Set the user's id in the session to indicate successful login
    req.session.user_id = user.id
    req.session.logged_in = true

    res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router