import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { 'Authorization': token}
  }
  const url = `${baseUrl}/${newObject.id}`

  const response = await axios.put(url, newObject, config)
  
  return response.data
}

const deleteBlog = async (blogObject) => {
  const config = {
    headers: { 'Authorization': token}
  }

  const url = `${baseUrl}/${blogObject.id}`

  await axios.delete(url, config)
}

export default { getAll, create, setToken, update, deleteBlog}