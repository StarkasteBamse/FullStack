import React from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleChange, author, title, url }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onSubmit}>
        <div>author
            <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>title
            <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>url
            <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  author: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  url: propTypes.string.isRequired
}

export default BlogForm