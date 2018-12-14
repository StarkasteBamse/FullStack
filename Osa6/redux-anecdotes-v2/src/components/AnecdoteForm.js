import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreate } from './../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.anecdoteCreate(e.target.anecdote.value)
    this.props.showNotification('added anecdote, it\'s probably bad')
    setTimeout(() => {
      this.props.hideNotification()
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}



export default connect(
  null,
  { anecdoteCreate,
    showNotification,
    hideNotification }
)(AnecdoteForm)
