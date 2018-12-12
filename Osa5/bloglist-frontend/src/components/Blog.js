import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      showMore: false
    }
  }

  toggleShowMore = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  addLikes = async () => {
    const updatedBlog = await this.state.addLike(this.state.blog)
    this.setState({ blog: updatedBlog })
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }


    
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    let deleteButton = () => (
      <div></div>
    )
    if (!this.state.blog.user || this.state.blog.user._id === loggedUser.id) {
      deleteButton = () => (
        <div>
        <input style={{ color: 'red' }} type="button" onClick={() => this.state.deleteBlog(this.state.blog)} value="delete" />
        </div>
      )
     
  }

  return(
      <div style = { blogStyle } >
      {
        this.state.showMore ?
          <div className="content">
            <p className="nameAndTitle" onClick={this.toggleShowMore}>{this.state.blog.title} {this.state.blog.author}</p>
            <a href={this.state.blog.url}>{this.state.blog.url}</a>
            <div>
              {this.state.blog.likes} likes <input type="button" onClick={this.addLikes} value="like" />
            </div>
            {/*
              <form onSubmit={this.props.addLike} value={this.props.blog}>
                <div>
                  {this.props.blog.likes}likes<button type="submit">Like</button>
                </div>
              </form>
              */}
            {this.state.blog.user ?
              <p>added by {this.state.blog.user.name}</p>
              : <p />}
            {deleteButton()}
          </div>
          :
          <div className="nameAndTitle" onClick={this.toggleShowMore}>
            {this.state.blog.title} {this.state.blog.author}
          </div>
      }
      </div>
    )
  }
}

export default Blog