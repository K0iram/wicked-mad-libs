import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <nav className="main-nav">
        <Link to="/home">Home</Link>
        <span> | </span>
        <Link to="/stories">Stories</Link>
        <span> | </span>
        <Link to="/about">About</Link>
      </nav>
    )
  }
}

export default Navigation
