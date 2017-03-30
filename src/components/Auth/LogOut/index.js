import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import STORE from '../../../store'
import API from '../../../API'

class LogOut extends Component {
  componentWillMount() {
    this.logout()
  }

  logout() {
    API.signOut()
    window.localStorage.clear()
    STORE.user = {}
    STORE.token = null
  }


  render() {
    return <Redirect to="/home"/>

  }
}

export default LogOut;
