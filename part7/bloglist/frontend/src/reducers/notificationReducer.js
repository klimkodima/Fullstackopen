const reducer = (state = { message:null, className:null }, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data
  case 'HIDE':
    return { message:null, className:null }
  default:
    return state
  }
}

export const setNotification = (message, className) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: { message, className }
    })
    clearTimeout()
    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, 5000)
  }
}

export default reducer