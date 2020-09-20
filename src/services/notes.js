import Axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Axios.get(baseUrl)
}

const create = newNote => {
  const config = {
    headers: { Authorization: token }
  }
  return Axios.post(baseUrl, newNote, config)
}

const update = (id, changedNote) => {
  return Axios.patch(`${baseUrl}/${id}`, changedNote)
}

const deleteNote = id => {
  return Axios.delete(`${baseUrl}/${id}`)
}

// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }
//  ==
export default { getAll, create, update, deleteNote, setToken }