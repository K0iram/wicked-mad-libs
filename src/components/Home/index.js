import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../API'
import './style.css'


const CardTemplate = (template) => (
  <div className='story-card'>
    <header>
      <h3>{template.title}</h3>
    </header>
    <p>{template.requiredWords.length} replaceable words</p>
    <footer>
      <Link to={`/stories/${ template._id}`}>
      <button className='button-primary button-start'>Start this story!</button>
      </Link>
    </footer>
  </div>
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
        <h1 className="welcome">Pick A Story And Have Some Fun!</h1>
        <div className="story-list">
          {this.state.templates.map((template) => {
            return (
              CardTemplate(template)
            )
          })}
        </div>
        <div className="description">
          <br/>
          <p><strong>Mad Libs</strong> - a phrasal template word game where one
             player prompts others for a list of words to substitute
             for blanks in a story, before reading the – often comical
             or nonsensical – story aloud. The game is frequently played
             as a party game or as a pastime.
          </p>
        </div>
      </div>
    )
  }
}

export default Home;
