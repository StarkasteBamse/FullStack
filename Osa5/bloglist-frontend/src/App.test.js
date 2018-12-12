import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged in', () => {
        beforeEach(() => {
            window.localStorage.clear()
            app = mount(<App />)
        })

        it('show only login screen if user not logged in', () => {
            app.update()
            expect(app.contains(<h2>blogs</h2>)).toEqual(false)
            expect(app.contains(<h2>Please log in to the application</h2>)).toEqual(true)
        })
    })

    describe('when user is logged in', () => {
        beforeEach(() => {
            const user = {
                _id: "5c0a734d23b752155037d465",
                username: "AzureDiamond",
                name: "T.est",
                token: 123456789
            }
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)           
        })

        it('if user is logged in then blogs will be displayed', () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.lenght).toEqual(blogService.blogs.lenght)
            expect(app.contains(<h2>blogs</h2>)).toEqual(true)
            expect(app.contains(<h2>Please log in to the application</h2>)).toEqual(false)
        })
    })
})