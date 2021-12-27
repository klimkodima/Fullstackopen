import React, { useEffect } from 'react'
import LoginForm  from './components/LoginForm'
import Blogs  from './components/Blogs'
import Users  from './components/Users'
import User  from './components/User'
import Blog  from './components/Blog'
import Notification from './components/Notification'
import { useSelector, useDispatch  } from 'react-redux'
import { initializeUser, logOut } from './reducers/userReducer'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Menu, Button, Header, Container } from 'semantic-ui-react'


const App = () => {

  const  user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect( () => {
    dispatch(initializeUser(user))
  }, [])

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }

  return (
    <>
      { user === null ? (
        <Container>
          <Header as='h1'>log in to application</Header>
          <Notification/>
          <LoginForm/>
        </Container>) :
        (
          <Container>
            <Menu>
              <Menu.Item as={Link} to='/'>blogs</Menu.Item>
              <Menu.Item as={Link} to='/users'>users</Menu.Item>
              <Container>{user.name} logged in<Button id="logOutBtn" onClick ={handleLogOut}>logout</Button></Container>
            </Menu>
            <Notification/>
            <Header as='h1' dividing>blogg app</Header>
            <Routes>
              <Route path="/blogs/:id" element={<Blog/>}/>
              <Route path="/users/:id" element={<User/>}/>
              <Route path="/users" element={<Users/>}/>
              <Route path="/" element={<Blogs/>}/>
            </Routes>
          </Container>
        )
      }
    </>
  )
}

export default App
