const { Post } = require('../models')

const postData = [
    {
        title: "I Love Programs",
        post_content: " yes ",
        user_id: 1
    },
    {
        title: "GPUs cost money",
        post_content: " also yes ",
        user_id: 2
    }
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts