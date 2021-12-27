import axios from 'axios'
const baseUrl = '/api/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl + 'blogs', config)
  return response.data
}

const getById =  async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}blogs/${id}`, config)
  return response.data
}

const create =   async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl + 'blogs', newObject, config)
  return response.data
}

const update =  async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}blogs/${id}`, newObject, config)
  return response.data
}

const addComment =  async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}blogs/${id}/comments`, comment , config)
  return response.data
}

const deleteBlog =  async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}blogs/${id}`, config)
  return response.data
}

const blogsServise = { getAll, create, update, deleteBlog, getById, setToken, addComment }

export default blogsServise