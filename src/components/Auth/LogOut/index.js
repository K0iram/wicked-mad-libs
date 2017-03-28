import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import STORE from '../../../store'

class LogOut extends Component {
  componentWillMount() {
    this.logout()
  }

  logout() {
    window.localStorage.clear()
    STORE.user = {}
    STORE.token = null
  }


  render() {
    return <Redirect to="/home"/>

  }
}

export default LogOut;
