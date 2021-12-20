import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'VOTE':
    return state.map(anecdote =>
      anecdote.id !== action.data.id ? anecdote : action.data
    )
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = {
      content,
      votes:0,
      id: getId()
    }
    const data = await anecdoteService.createNew(newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

export default reducer