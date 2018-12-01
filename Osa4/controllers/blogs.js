const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})

        response.json(blogs)
    } catch (exeption) {
        console.log(exeption)
    }

})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exeption) {
        console.log(exeption)
    }
})

module.exports = blogsRouter