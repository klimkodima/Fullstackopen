import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {

  const dispatch = useDispatch()

  const addVote  = () => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(vote(changedAnecdote))
    dispatch(setNotification(`You voted "${ changedAnecdote.content }"`, 10))
  }
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={ addVote }>vote</button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if(state.filter === null) {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  return (
    <div>
      { anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={ anecdote.id }
            anecdote={ anecdote }
          />
        )
      }
    </div>
  )
}

export default AnecdoteList