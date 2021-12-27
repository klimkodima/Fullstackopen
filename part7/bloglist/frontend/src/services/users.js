import axios from 'axios'
const baseUrl = '/api/'

const getAll = () => {
  const request = axios.get(baseUrl + 'users')
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl + 'users', newObject)
  return request.then(response => response.data)
}

const userServise = { getAll, create }

export default userServise