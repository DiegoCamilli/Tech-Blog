const express = require('express')
const router = express.Router()
const { Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// GET all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content', 'dateCreated', 'username'],
        },
      ],
    })

    const posts = postData.map((post) => post.get({ plain: true }))
    res.render('homepage', { posts, loggedIn: req.session.logged_in })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// GET a single post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['content', 'dateCreated', 'username'],
        },
      ],
    })

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' })
      return
    }

    const post = postData.get({ plain: true })
    res.render('single-post', { post, loggedIn: req.session.logged_in })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// POST a new post
router.post('/post', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      author: req.session.username,
    })

    res.status(200).json(newPost)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// DELETE a post
router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        author: req.session.username,
      },
    })

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found' })
      return
    }

    res.status(200).json(deletedPost)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router