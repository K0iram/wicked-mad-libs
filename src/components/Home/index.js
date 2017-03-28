import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../API'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './style.css'


const CardTemplate = (template) => (
  <Card className='story-card'>
    <CardHeader
      title={template.title}
      subtitle={template.description}
    />
    <CardActions>
      <FlatButton>
        <Link to={`/stories/${ template._id}`}> Start this story!</Link>
      </FlatButton>
    </CardActions>
  </Card>
);


class Home extends Component {

constructor(props) {
  super(props)
  this.state = {
    templates: []
  }

}

componentDidMount() {
  API.fetchTemplates().then((res) => {
    this.setState({templates: res.data.templates})
  })
}

  render() {
    return (
      <div>
        <div className="story-list">
          {this.state.templates.map((template) => {
            return (
              CardTemplate(template)
            )
          })}
        </div>
      </div>
    )
  }
}

export default Home;
