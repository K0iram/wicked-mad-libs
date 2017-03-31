import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import API from '../../API/'
import STORE from '../../store'
import moment from 'moment'
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
  <Card className='page-card' key={page.id}>
    <CardHeader
      className='card-title'
      title={page.title}
      subtitle={moment(page.createdAt).format("MM/DD/YYYY")}
    />
  <CardText className="card-box">
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
      <div className='card-header'>
        <h1>Welcome back {STORE.user.email}</h1>
        <div className="page-list">
          {!this.state.pages.length &&
            <div className='story-error'>
              <h2> You have no stories, <Link to="/home">get started!</Link></h2>

            </div>
          }

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
