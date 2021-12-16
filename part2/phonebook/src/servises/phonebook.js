import axios from 'axios'
const baseUrl = '/api/'

const getAll = () => {
  const request = axios.get(baseUrl + "people")
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl + "person", newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}person/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}people/${id}`) 
}

const phonebookService = { getAll, create, update, deletePerson }

export default phonebookService