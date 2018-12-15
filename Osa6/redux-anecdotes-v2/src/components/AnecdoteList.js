import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from './../service/anecdotes'

class AnecdoteList extends React.Component {
  voteForAnecdote = async (anecdote) => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    this.props.voteAnecdote(votedAnecdote)
    this.props.showNotification('you voted: ' + anecdote.content)
    setTimeout(() => {
      this.props.hideNotification()
    }, 5000)
  }



  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button  onClick={() => {
                this.voteForAnecdote(anecdote)
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

const filterAnecdotes = (anecdotes, filter) =>
  anecdotes.filter((anecdote) => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)


const mapStateToProps = (state) => {
  return {
    filteredAnecdotes: filterAnecdotes(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  {
    voteAnecdote,
    showNotification,
    hideNotification
  }
)(AnecdoteList)

export default ConnectedAnecdoteList