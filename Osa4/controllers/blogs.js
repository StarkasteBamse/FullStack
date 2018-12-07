const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username : 1, name : 1}) 
        response.status(200).json(blogs.map(blog => Blog.format(blog)))
    } catch (exeption) {
        console.log(exeption)
        response.status(500).json({ error: 'something went wrong...' })
    }

})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.title === undefined || body.url === undefined) {
            return response.status(400).json({ error: 'content missing'})
        }

        const user = await User.findById(body.userId)

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
    } catch (exeption) {
        console.log(exeption)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

blogsRouter.delete("/:id", async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)

        response.status(204).end()
    } catch (exeption) {
        console.log(exeption)
        response.status(400).json({ error: 'malformatted id' })
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

        const editedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.status(200).json(editedBlog)
    } catch (exeption) {
        console.log(exeption)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = blogsRouter