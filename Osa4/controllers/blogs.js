const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.status(200).json(blogs.map(blog => Blog.format(blog)))
    } catch (exeption) {
        console.log(exeption)
        response.status(500).json({ error: 'something went wrong...' })
    }

})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (body.title === undefined || body.url === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(Blog.format(savedBlog))
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    try {
        if (!request.token) {
            return response.status(401).json({ error: 'token missing' })
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const blog = await Blog.findById(request.params.id)
        if (blog === null) {
            return response.status(404).json({ error: 'missing blog by id'})
        } else if (blog.user.toString() === decodedToken.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            return response.status(204).end()
        }
        
        response.status(401).json({ error: 'don\'t try deleting other peoples blogs'})
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }


})

blogsRouter.put('/:id', async (request, response) => {

    try {
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const editedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(200).json(editedBlog)
    } catch (exeption) {
        console.log(exeption)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = blogsRouter