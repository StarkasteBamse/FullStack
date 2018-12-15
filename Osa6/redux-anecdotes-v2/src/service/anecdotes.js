import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })
  return response.data
}

const update = async (content) => {
  const response = await axios.put(url, content)
  return response.data
}

const vote = async (content) => {
  const response = await axios.put(`${url}/${content.id}`, { ...content, votes: content.votes + 1 })
  return response.data
}

export default { getAll, createNew, update, vote }