import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: 'Debugging is twice as hard as writing',
        votes: 0,
        id: 100
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'Debugging is twice as hard as writing',
        votes: 0,
        id: 100
      },
      {
        content: 'Debugging is twice as hard as writing',
        votes: 2,
        id: 101
      }]

    const action = {
      type: 'VOTE',
      data: {
        id: 101
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(2)

    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
        content: 'Debugging is twice as hard as writing',
        votes: 3,
        id: 101
    })
  })  
})