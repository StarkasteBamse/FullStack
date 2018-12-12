import React from 'react'
import { shallow } from 'enzyme'
import Blog from "./Blog"


describe('<Blog />', () => {
    const blog = {
        id: "5c0a7c0fc404320b28b21b53",
        title: "title",
        author: "author",
        url: "url",
        likes: 7,
        user: {
            _id: "5c0a734d23b752155037d465",
            username: "AzureDiamond",
            name: "T.est"
        }
    }
    const user = {
        _id: "5c0a734d23b752155037d465",
            username: "AzureDiamond",
            name: "T.est"
    }
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))


    it('after clicking name the details are displayed', () => {
        const blogComponent = shallow(<Blog blog={blog} />)

        expect(blogComponent.contains(<div className="content"></div>)).toEqual(false)

        const nameDiv = blogComponent.find('.nameAndTitle')
        expect(nameDiv.text()).toContain(blog.title)
        expect(nameDiv.text()).toContain(blog.author)

        nameDiv.simulate('click')
        
        const contentDiv = blogComponent.find('.content')
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.url)
    })
})