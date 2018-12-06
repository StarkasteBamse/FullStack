const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    console.log(request.body)
    
    try {
        const body = request.body
        console.log(body)
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult || true
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'whooot its not working'})
    }
})

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        response.json(users.map(user => User.format(user)))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'oops'})
    }
})

module.exports = usersRouter