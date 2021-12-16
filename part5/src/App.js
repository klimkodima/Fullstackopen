import React, { useState, useEffect } from 'react'
import LoginForm  from './components/LoginForm'
import Blogs  from './components/Blogs'
import blogsService from './servises/blogs'
import Notification from './components/Notification'


const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')

  useEffect( () => {
    const loggedUserJSON =window.localStorage.getItem('loggedBlogsappUser')
    if( loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const setNewMessageClass = (newClass) => setMessageClass(newClass)
  const setNewMessage = (message) => setMessage(message)
  const loginUser = (user) => setUser(user)

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setMessageClass('success')
    setMessage(`${user.username} was logged out  successfully`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      { user === null ? (<h2>log in to application</h2>) : (<h2>Blogs</h2>) }
      <Notification message={message} messageClass={messageClass}/>
      { user === null ?
        (<LoginForm   loginUser={loginUser} setNewMessageClass={setNewMessageClass} setNewMessage={setNewMessage}/>):
        (<Blogs user={user} handleLogOut={handleLogOut} setNewMessageClass={setNewMessageClass} setNewMessage={setNewMessage}/>)
      }
    </>
  )
}

export default App
