import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome To Wicked Mad Libs!</h1>
        <p>Click <Link to="/stories">Here</Link> to play a round!</p>

        <p>For more fun and to be able to save your stories,
           please <Link to="/signup">sign up!</Link></p>
      </div>
    )
  }
}

export default Home;
