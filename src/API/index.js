import axios from 'axios'
const API = {}


const origin = process.ENV === 'prod' ? '' : 'http://localhost:4741'

API.fetchTemplates = () => {
  return axios.get(`${origin}/templates`)
}

API.fetchTemplate = (id) => {
  return axios.get(`${origin}/templates/${id}`)
}

export default API
