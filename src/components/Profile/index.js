import React, { Component } from 'react'
import API from '../../API/'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pages: []
    }
  }

  componentDidMount() {
    API.fetchPages().then((res) => {
      this.setState({pages: res.data.pages})
    })
  }

  render() {
    return (
      <div>
        <h1>User Profile</h1>

        <ul>
          {this.state.pages.map((page) => {
            return <li>{page.title}</li>
          })}
        </ul>

      </div>
    )
  }
}


export default Profile
