const express = require('express')
const router = express.Router()
const { Post, User } = require('../models')
const withAuth = require('../utils/auth')

// GET the dashboard page
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })

    const posts = postData.map((post) => post.get({ plain: true }))

    res.render('dashboard', { posts, loggedIn: true })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// GET the new post page
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', { loggedIn: true })
})

module.exports = router