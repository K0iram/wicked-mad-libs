import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">

        <h1>Page Not Found</h1>

        <Link to="/home">Go to Home Page</Link>

      </div>
    );
  }
}

export default NotFound;
