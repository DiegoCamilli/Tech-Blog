const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the main route!')
})

router.get('/main', (req, res) => {
  res.send('main')
})

module.exports = router