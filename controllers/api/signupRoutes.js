const express = require('express')
const router = express.Router()
const { User } = require('../../models')
const bcrypt = require('bcrypt')

// GET the signup page
router.get('/', (req, res) => {
  res.render('signup')
})

// POST route to handle user signup
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      res.status(400).render('signup', { errorMessage: 'Email already in use' })
      return
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    })

    // Set the users id in the session
    req.session.user_id = newUser.id
    req.session.logged_in = true

    res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router