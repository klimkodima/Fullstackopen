import React, { useState } from 'react'
import loginService from '../servises/login'
import blogsService from '../servises/blogs'
import PropTypes from 'prop-types'


const LoginForm =({ loginUser, setNewMessageClass, setNewMessage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUserNameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      loginUser(user)
      setNewMessageClass('success')
      setNewMessage(`${username} was logged successfully`)
    } catch (error) {
      setNewMessageClass('error')
      setNewMessage (error.response.data.error)
    }
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
    setUsername('')
    setPassword('')
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
        username: <input id='username' value={username} type="text" name="username" onChange={handleUserNameChange}/>
      </div>
      <br/>
      <div>password: <input id='password' value={password} type="password"  name="password" onChange={handlePasswordChange}/></div>
      <div>
        <button id="login-button" type="submit">log in</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setNewMessageClass: PropTypes.func.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string
}

export default LoginForm