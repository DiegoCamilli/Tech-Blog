const { User } = require('../models')

const userData = [
    {
        username: "David",
        email: "david#email.com",
        password: "password"
    },
    {
        username: "Jake",
        email: "jak@email.com",
        password: "password"
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers