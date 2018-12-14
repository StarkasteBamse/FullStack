import React from 'react'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const raw = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter
    const anecdotes = raw.filter((anecdote) =>
      anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(voteAnecdote(anecdote.id))
                this.props.store.dispatch(showNotification('you voted: ' + anecdote.content))
                setTimeout(() => {
                  this.props.store.dispatch(hideNotification())
                }, 5000)
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
