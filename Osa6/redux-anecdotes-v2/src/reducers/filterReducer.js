const filterReducer = (state = '', action) => {
  switch(action.type) {
  case 'FILTER':
    return action.word
  default:
    return state
  }
}

export const filter = (word) => {
  return {
    type: 'FILTER',
    word
  }
}

export default filterReducer