import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../API/'
import STORE from '../../store'
import {Card, CardActions, CardHeader, CardText, CardFooter} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './style.css'


const CardTemplate = (page) => (
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
        <button className="button btn">Delete</button>
    </CardActions>
  </Card>
);


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
        <h1>{STORE.user.email} Profile</h1>
        <div className="page-list">
          {this.state.pages.map((page) => {
            return (
              CardTemplate(page)
            )
          })}
        </div>
      </div>
    )
  }
}


export default Profile
