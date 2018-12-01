const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
]

beforeAll(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('api/blogs GET', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('specific blog is returned with correct fields and values', async () => {
        const response = await api
            .get('/api/blogs')

        const ids = response.body.map(r => r._id)
        expect(ids).toContain("5a422aa71b54a676234d17f8")

        const titles = response.body.map(r => r.title)
        expect(titles).toContain("Go To Statement Considered Harmful")

        const authors = response.body.map(r => r.author)
        expect(authors).toContain("Edsger W. Dijkstra")

        const urls = response.body.map(r => r.url)
        expect(urls).toContain("http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html")

        const likes = response.body.map(r => r.likes)
        expect(likes).toContain(5)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length)
    })

    
})


afterAll(() => {
    server.close
})