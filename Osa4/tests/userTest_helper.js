const User = require('../models/user')
const bcrypt = require('bcryptjs')

const initialUsers = [
    {
        username: 'MuPe',
        name: "Muumi Peikko",
        passwordHash: '$2a$10$KKXFED/b6AhPP0YHjmw2cezmaeayrzpNNm6ua1ZhJ/Jj3DmwoY3Au', //p:test
        adult: false
    },
    {
        username: "Nuuskis",
        name: "Nuuskamuikkunen",
        passwordHash: '$2a$10$q.pvecK2LstnmlLLu0Uql.V/1nggiA5jA05moG1GTSc72xcKOcdVu', //p:hunter2
        adult: true
    }
]

const usersInDB = async () => {
    const users = await User.find({})
    return users
}

const cleanUserDB = async () => {
    await User.deleteMany({})

    const usersObjects = initialUsers.map(user => new User(user))
    
    await Promise.all(usersObjects.map(user => user.save()))
}


module.exports = {
    initialUsers, usersInDB, cleanUserDB
}