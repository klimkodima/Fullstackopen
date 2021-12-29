import React from 'react'
import { login } from '../reducers/userReducer'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { Form } from 'semantic-ui-react'


const LoginForm =() => {

  const dispatch = useDispatch()
  const [ username, usernameReset ] = useField()
  const [ password, passwordReset ] = useField()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({
      username: username.value
      , password: password.value
    }))
    dispatch(setNotification(`${username.value} was logged successfully`))
    usernameReset()
    passwordReset()
  }

  return(
    <Form onSubmit={handleLogin}>
      <Form.Input required inline label='Username' placeholder=' enter username' id='username' {...username}/>
      <Form.Input  required inline label='Password' placeholder='enter password'  type='password' id='password' {...password}/>
      <Form.Button id="login-button" type="submit">log in</Form.Button>
    </Form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}

export default LoginForm