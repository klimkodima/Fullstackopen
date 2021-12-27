import axios from 'axios'
const baseUrl = '/api/'

const loginServise = async newObject => {
  const response = await axios.post(baseUrl + 'login', newObject)
  return response.data
}

export default loginServise