const store = {};
//check for existing user and set it otherwise empty
const loggedInUser = JSON.parse(window.localStorage.getItem('user')) || {};
store.user = loggedInUser;

if (!!store.user && !!store.user.token) {
  store.token = store.user.token
}

module.exports = store;
