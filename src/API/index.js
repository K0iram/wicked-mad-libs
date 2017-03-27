import axios from 'axios'
const API = {}

const store = require('../store');
const origin = process.ENV === 'prod' ? '' : 'http://localhost:4741'
let config = {
  headers: {'Authorization': `Token token=${store.user.token}`}
};

API.fetchTemplates = () => {
  return axios.get(`${origin}/templates`)
}

API.fetchTemplate = (id) => {
  return axios.get(`${origin}/templates/${id}`)
}

API.signIn = (data) => {
  return axios.post(`${origin}/sign-in`, data)
}

API.signUp = (data) => {
  return axios.post(`${origin}/sign-up`)
}

API.changePassword = (data) => {
  return axios.patch(`${origin}/change-password/${store.user.id}`, config)
}

API.signOut = () => {
  return axios.delete(`${origin}/sign-out/${store.user.id}`, config)
}


export default API
