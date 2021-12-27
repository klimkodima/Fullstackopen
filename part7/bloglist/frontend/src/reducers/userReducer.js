import loginService from '../services/login'
import blogsService from '../services/blogs'


const reducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export const login = (user) => {
  return async dispatch => {
    const data = await loginService(user)
    window.localStorage.setItem('loggedUser', JSON.stringify(data))
    blogsService.setToken(data.token)
    dispatch({
      type: 'LOGIN',
      data
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON =window.localStorage.getItem('loggedUser')
    let data = null
    if( loggedUserJSON ) {
      data = JSON.parse(loggedUserJSON)
      blogsService.setToken(data.token)
    }
    dispatch({
      type: 'INIT_USER',
      data
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default reducer