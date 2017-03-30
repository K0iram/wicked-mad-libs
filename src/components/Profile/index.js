import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import API from '../../API/'
import STORE from '../../store'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './style.css'



class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pages: [],
      loggedIn: !!STORE.token
    }

    this.deletePage = this.deletePage.bind(this)

  }

componentDidMount() {
  this.setState({loggedIn: !!STORE.token})
  let id = STORE.user.id
  API.fetchPages(id).then((res) => {
    this.setState({pages: res.data.pages})
  })
}

renderCard(page) {
  return(
  <Card className='page-card'>
    <CardHeader
      className='card-title'
      title={page.title}
      subtitle={page.createdAt}
    />
  <CardText>
    <div className="card-text">{page.body}</div>
    </CardText>
    <CardActions>
        <button onClick={this.deletePage.bind(this, page.id)} className="button btn">Delete</button>
    </CardActions>
  </Card>
  )
}

deletePage(event) {
  let id = event
  API.destroyPages(id).then((res) => {
    API.fetchPages(id).then((res) => {
      this.setState({pages: res.data.pages})
    })
    window.AppNotify("You have deleted a story with the id of " + event)
  })
}

  render() {
    if (!this.state.loggedIn) return <Redirect to="/home"/>
    return (
      <div>
        <h1>{STORE.user.email} Profile</h1>
        <div className="page-list">
          {this.state.pages.map((page) => {
            return (
              this.renderCard(page)
            )
          })}
        </div>
      </div>
    )
  }
}


export default Profile
