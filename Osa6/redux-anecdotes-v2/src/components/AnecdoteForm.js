import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreate } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.anecdoteCreate(e.target.anecdote.value)
    e.target.anecdote.value = ''
    this.props.notify('added anecdote, it\'s probably bad', 5)
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
    notify }
)(AnecdoteForm)
