import React, { Component } from 'react'
import template from './tmp-template.js'
import API from '../../API/'
import './style.css'


class Stories extends Component {

  constructor(props) {
    super(props)

    this.state = {
      templateStore: template.templateString,
      requiredWords: template.requiredWords,
      title: template.title,
      description: template.description,
      userWords: template.requiredWords,
      finalStory: '',
      isComplete: false
    }

    this.showPreview = this.showPreview.bind(this)

  }

  componentDidMount() {
    API.fetchTemplate(this.props.match.params.storyId).then((res) => {
      console.log(res)
    })
  }

  updateStory(index, event) {
    const updatedUserWords = [...this.state.userWords].map((word, wordIndex) => {
      if (wordIndex === index) return event.target.value

      return word
    })

    this.setState({userWords: updatedUserWords})
  }

  getFormattedType(type) {
    const types = {
      "$$$PLACE": "A Place",
      "$$$ADJECTIVE": "A Adjective",
      "$$$FEMALE_NAME": "A Female Name",
      "$$$BODY_PART": "A Body Part",
      "$$$BODY_ORGAN": "A Human Organ",
      "$$$MALE_NAME": "A Male Name"
    }

    return types[type]
  }

  renderFormFeilds() {
    return this.state.requiredWords.map((type, index) => {
      return (
        <li><input type='text' placeholder={this.getFormattedType(type)} onChange={ this.updateStory.bind(this, index) } required='required' /></li>
      )
    })
  }

  getFinalStory() {
    let storyString = ''
    const {requiredWords, userWords} = this.state

    const tmpCopy = this.state.templateStore.slice(0)
    tmpCopy.map((section, index) => {
      storyString += section.replace(requiredWords[index], userWords[index])
    })

    return storyString
  }

  showPreview() {
    this.setState({finalStory: this.getFinalStory(), isComplete: true})
  }

  render() {

    return (
      <div className="home">
        <h1>{ this.state.title }</h1>
        <h5>Please fill in all the fields and press finished to see your custom story!</h5>
        {this.state.isComplete &&
        <p>{this.getFinalStory()}</p>
        }

        {!this.state.isComplete &&
          <div>
            <ol>
              { this.renderFormFeilds() }
            </ol>
            <button className="button-primary btn" onClick={ this.showPreview }>Finished!</button>

          </div>
        }

      </div>

    )
  }
}

export default Stories
