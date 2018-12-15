const reducer = (store = [], action) => {
  if (action.type === 'VOTED') {
    const old = store.filter(a => a.id !== action.anecdote.id)
    return [...old, action.anecdote]
  }
  if (action.type === 'CREATE') {
    return [...store, action.anecdote ]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteCreate = (anecdote) => {
  return {
    type: 'CREATE',
    anecdote
  }
}

export const voteAnecdote = (anecdote) => {
  return {
    type: 'VOTED',
    anecdote
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default reducer