const express = require('express')
const router = express.Router()
const { Post, User } = require('../models')

// GET the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })

    const posts = postData.map((post) => post.get({ plain: true }))

    res.render('homepage', { posts, loggedIn: req.session.loggedIn })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router