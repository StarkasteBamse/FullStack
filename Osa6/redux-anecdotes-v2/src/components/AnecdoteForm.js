import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreate } from './../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from './../service/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreate(newAnecdote)
    this.props.showNotification('added anecdote, it\'s probably bad')
    setTimeout(() => {
      this.props.hideNotification()
    }, 5000)
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
