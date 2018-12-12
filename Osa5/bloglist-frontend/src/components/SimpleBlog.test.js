import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from "./SimpleBlog"

describe('<SimpleBlog />', () => {
    const blog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }
     
    it('renders content', () => {
        const simpleBlogComponent = shallow(<SimpleBlog blog={blog}/>)
        
        const contentDiv = simpleBlogComponent.find('.content')
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)

        const likesDiv = simpleBlogComponent.find('.likes')
        expect(likesDiv.text()).toContain(blog.likes)
    })

    it('button calls its given function', () => {
        const mockHandler = jest.fn()

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

        const button = simpleBlogComponent.find('button')
       
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(1)

        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)

    })
})