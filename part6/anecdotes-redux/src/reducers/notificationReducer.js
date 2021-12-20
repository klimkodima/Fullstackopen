const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data
  case 'HIDE':
    return null
  default:
    return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: message
    })
    clearTimeout()
    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, time * 1000)
  }
}

export default reducer