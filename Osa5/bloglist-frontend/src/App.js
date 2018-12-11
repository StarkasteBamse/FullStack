import React from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Success from './components/Success'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: {
        author: '',
        title: '',
        url: ''
      },
      username: 'AzureDiamond',
      password: 'hunter2',
      user: null,
      error: null,
      success: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user, success: 'user ' + user.username + ' just logged in' })
      setTimeout(() => {
        this.setState({ success: null })
      }, 3000)
    } catch (exception) {
      this.setState({
        error: 'username or password incorrect'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 3000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null, success: 'user ' + this.state.user.username + ' has been logged out' })
    setTimeout(() => {
      this.setState({ success: null })
    }, 3000)
  }

  handleBlogChange = (event) => {
    const blog = { ...this.state.newBlog, [event.target.name]: event.target.value }
    this.setState({ newBlog: blog })
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        ...this.state.newBlog,
      }

      const newBlog = await blogService.create(blogObject)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        newBlog: {
          author: '',
          title: '',
          url: ''
        },
        success: 'a new blog ' + newBlog.title + ' by ' + newBlog.author + ' was added'
      })
      setTimeout(() => {
        this.setState({ success: null })
      }, 3000)

    } catch (exception) {
      this.setState({
        error: exception.toString()
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 3000)
    }
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Please log in to the application</h2>
        <form onSubmit={this.login}>
          <div>username
              <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>password
              <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>blogs</h2>
        <form onSubmit={this.logout}>
          <div>{this.state.user.name} logged in<button type="submit">logout</button></div>
        </form>
        <h3>create new</h3>
        <form onSubmit={this.addBlog}>
          <div>author
            <input
              type="text"
              name="author"
              value={this.state.newBlog.author}
              onChange={this.handleBlogChange}
            />
          </div>
          <div>title
            <input
              type="text"
              name="title"
              value={this.state.newBlog.title}
              onChange={this.handleBlogChange}
            />
          </div>
          <div>url
            <input
              type="text"
              name="url"
              value={this.state.newBlog.url}
              onChange={this.handleBlogChange}
            />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>

        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )

    return (
      <div>
        <h1>BlogService</h1>
        <Error message={this.state.error} />
        <Success message={this.state.success} />

        {this.state.user === null ?
          loginForm() :
          blogForm()
        }

      </div>
    )
  }
}

export default App;
