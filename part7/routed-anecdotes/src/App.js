import React, { useState } from 'react'
import About from './components/about'
import Footer from './components/footer'
import AnecdoteList from './components/anecdoteList'
import CreateNew from './components/createNew'
import { useRouteMatch, Switch, Route, Link,  useHistory } from 'react-router-dom'
import Anecdote from './components/anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const match = useRouteMatch('/anecdotes/:id')
  const history = useHistory()
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  const [notification, setNotification] = useState('')
  const showNotification = message => {
    setNotification(message)
    setTimeout(() => setNotification(null), 10000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    showNotification(`a new anecdote ${anecdote.content} created`)
    history.push('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      { notification ? <div className='success'> {notification} </div> : null }
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} addVote={vote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew= { addNew } />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes= { anecdotes }/>
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App