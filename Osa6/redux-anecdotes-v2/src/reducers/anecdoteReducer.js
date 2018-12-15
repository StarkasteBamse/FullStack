import anecdoteService from './../service/anecdotes'

const reducer = (store = [], action) => {
  if (action.type === 'VOTED') {
    const old = store.filter(a => a.id !== action.anecdote.id)
    return [...old, action.anecdote]
  }
  if (action.type === 'CREATE') {
    return [...store, action.anecdote]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteCreate = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      anecdote: savedAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTED',
      anecdote: votedAnecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default reducer