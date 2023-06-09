const express = require('express')
const router = express.Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// POST a new comment
router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      username: req.session.username,
    })

    res.status(200).json(newComment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// DELETE a comment
router.delete('/comment/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    })

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id!' })
      return
    }

    res.status(200).json(deletedComment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router