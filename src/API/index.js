import axios from 'axios'
const API = {}

const store = require('../store');
const config = {
  production: {
    api: 'https://murmuring-depths-64110.herokuapp.com'
  },
  development: {
    api: 'http://localhost:4741'
  }
}

const origin = config[process.env.NODE_ENV].api

API.fetchTemplates = () => {
  return axios.get(`${origin}/templates`)
}

API.fetchTemplate = (id) => {
  return axios.get(`${origin}/templates/${id}`)
}

API.fetchPages = function (){
  return axios({
    url: origin + `/pages`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    }
  });
};

API.pushPages = function (data){
  return axios({
    url: origin + '/pages',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

API.destroyPages = function (id){
  return axios({
    url: origin + `/pages/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

API.signIn = function (data){
  return axios({
    url: origin + '/sign-in',
    method: 'POST',
    data,
  });
};

API.signUp = function (data){
  return axios({
    url: origin + '/sign-up',
    method: 'POST',
    data,
  });
};

API.changePassword = function (data) {
  return axios({
    url: `${origin}/change-password/${store.user.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

API.signOut = function () {
  return axios({
    url: `${origin}/sign-out/${store.user.id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};


export default API
