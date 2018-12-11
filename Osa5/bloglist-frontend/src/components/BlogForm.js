import React from 'react'

const BlogForm = ({ onSumbit, handleChange, author, title, url }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onSumbit}>
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

export default BlogForm