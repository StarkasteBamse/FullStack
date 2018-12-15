import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {
  voteForAnecdote = async (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify('you voted: ' + anecdote.content, 5)
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
    notify
  }
)(AnecdoteList)

export default ConnectedAnecdoteList