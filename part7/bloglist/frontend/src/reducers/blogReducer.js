import blogsService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'ADD_COMMENT':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'VOTE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'DELETE_BLOG':
    return state.filter(n => n.id !== action.data)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const data = await blogsService.create(newBlog)
    dispatch({
      type: 'CREATE_BLOG',
      data
    })
  }
}

export const vote = (id, blog) => {
  return async dispatch => {
    const data = await blogsService.update(id, blog)
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const data = await blogsService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogsService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data:id
    })
  }
}

export default reducer