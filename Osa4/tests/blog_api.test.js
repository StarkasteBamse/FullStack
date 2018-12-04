const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB, cleanDB } = require('./test_helper')


describe('clean DB with test data', () => {
    beforeAll(cleanDB)

    describe('api/blogs GET', () => {

        test('all blogs are returned as json', async () => {
            const blogsInDatabase = await blogsInDB()
            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.length).toBe(blogsInDatabase.length)

            const returnedTitles = response.body.map(b => b.title)
            blogsInDatabase.forEach(blog => {
                expect(returnedTitles).toContain(blog.title)
            })
        })
    })


    describe('api/blogs POST', () => {

        test('a valid blog can be added', async () => {
            const newBlog = {
                title: 'blogs test',
                author: 'Mr Test',
                url: 'http://www.test.org/test',
                likes: 1
            }

            const blogsAtStart = await blogsInDB()

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAfterPost = await blogsInDB()
            expect(blogsAfterPost.length).toBe(blogsAtStart.length + 1)

            const titles = blogsAfterPost.map(b => b.title)
            expect(titles).toContain('blogs test')
        })

        test('a blog without likes field, will have zero likes', async () => {
            const newBlog = {
                title: 'Why nobody likes me',
                author: 'Mr Test',
                url: 'http://www.test.org/why'
            }

            const blogsAtStart = await blogsInDB()

            const response = await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            expect(response.body.likes).toBe(0)

            const blogsAfterPost = await blogsInDB()
            expect(blogsAfterPost.length).toBe(blogsAtStart.length + 1)

            const likes = blogsAfterPost.map(b => b.likes)
            expect(likes).toContain(0)
        })

        test('a blog without title or url field(s) will be rejected', async () => {
            const newBlogs = [{
                author: 'Mr Test',
                url: 'http://www.test.org/noTitle',
                likes: 123
            },
            {
                title: 'where is my url',
                author: 'Mr Test',
                likes: 123
            },
            {
                author: 'Mr Test',
                likes: 123
            }]
            
            await asyncForEach(newBlogs, async (newBlog) => {
                const blogsAtStart = await blogsInDB()
                
                await api
                    .post('/api/blogs')
                    .send(newBlog)
                    .expect(400)

                const blogsAfterPost = await blogsInDB()
                expect(blogsAfterPost.length).toBe(blogsAtStart.length)
            })
        })
    })
})

afterAll(() => {
    server.close
})

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}