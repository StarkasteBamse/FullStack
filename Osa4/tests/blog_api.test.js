const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB, cleanBlogDB } = require('./blogTest_helper')
const User = require('../models/user')
const {initialUsers, usersInDB, cleanUserDB} = require('./userTest_helper')


describe('running blog test data to DB', () => {
    beforeAll(cleanBlogDB)

    describe('api/blogs GET', () => {

        test('all blogs are returned as json', async () => {
            const blogsInDatabase = await blogsInDB()
            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.length).toBe(blogsInDatabase.length)

            const returnedTitles = response.body.map(r => r.title)
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

            const titles = blogsAfterPost.map(r => r.title)
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

            const likes = blogsAfterPost.map(r => r.likes)
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
    describe('/api/blogs/:id DELETE', async () => {
        let addedBlog
    
        beforeAll(async () => {
          addedBlog = new Blog({
            title: 'poisto pyynnöllä HTTP DELETE',
            author: 'testi',
            url: "http://deleted.com",
            likes: 0
          })
          await addedBlog.save()
        })
    
        test('a blog can be removed', async () => {
          const notesAtStart = await blogsInDB()
    
          await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)
    
          const notesAfterOperation = await blogsInDB()
    
          const titles = notesAfterOperation.map(r => r.titles)
    
          expect(titles).not.toContain(addedBlog.title)
          expect(notesAfterOperation.length).toBe(notesAtStart.length - 1)
        })
    })
    describe('/api/blogs/:id PUT', async () => {
        let addedBlog
    
        beforeAll(async () => {
          addedBlog = new Blog({
            title: 'Muokaa minua',
            author: 'MR Testi',
            url: "http://edited.com",
            likes: 0
          })
          await addedBlog.save()
        })

        test('a blog can be edited', async () => {
            editedBlog = new Blog({
                _id: addedBlog._id, 
                title: 'Muokattu', 
                author: 'Mr editor', 
                url: 'https://edited.com', 
                likes: 1}
            )
            await api
              .put(`/api/blogs/${editedBlog._id}`)
              .send(editedBlog)
              .expect(200)
      
            const notesAfterOperation = await blogsInDB()
      
            const titles = notesAfterOperation.map(r => r.title)
      
            expect(titles).not.toContain(addedBlog.title)
            expect(titles).toContain(editedBlog.title)
          })
    })
})

describe('running user test data to DB', () => {
    beforeAll(cleanUserDB)

    describe('/API/USERS GET', () => {

        test('all users are returned', async () => {
            const usersInDatabase = await usersInDB()
            const response = await api
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.length).toBe(usersInDatabase.length)

            const returnedUsers = response.body.map(r => r.username)
            usersInDatabase.forEach(user => {
                expect(returnedUsers).toContain(user.username)
            })
        })

    })

    describe('/API/USERS POST', () => {

        test('user can be created with required fields', async () => {
            const newUser = {
                username: 'testeri',
                name: 'Mr Test',
                password: 'hunter2'
            }
            
            const usersAtStart = await usersInDB()

            const response = await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            expect(response.body.adult).toBe(true)

            const usersAfterOperation = await usersInDB()
            expect(usersAfterOperation.length).toBe(usersAtStart.length + 1)

            const userNames = usersAfterOperation.map(user => user.username)
            expect(userNames).toContain(newUser.username)
        })


        test('user can\'t be created with password shorter than 3 letters', async () => {
            const shortPassword = {
                username: 'short',
                name: 'Mr Test',
                password: '12'
            }

            const response = await api
                .post('/api/users')
                .send(shortPassword)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(response.body).toEqual({error: 'password too short, minimum lenght 3'})
        })

        test('user can\'t be created with duplicate username', async () => {
            const duplicate = {
                username: 'MuPe',
                name: 'Mr Test',
                password: '123'
            }

            const response = await api
                .post('/api/users')
                .send(duplicate)
                .expect(400)
                .expect('Content-Type', /application\/json/)
                
            
            expect(response.body).toEqual({error: 'username must be unique'})
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