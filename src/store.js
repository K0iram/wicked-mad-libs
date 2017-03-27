const store = {};
//check for existing user and set it otherwise empty
const loggedInUser = JSON.parse(window.localStorage.getItem('user')) || {};
store.user = loggedInUser;

module.exports = store;
