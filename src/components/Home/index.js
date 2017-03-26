import React, { Component } from 'react'
import template from './tmp-template.js'
import './style.css'


class Home extends Component {

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
        <li><input type='text' placeholder={this.getFormattedType(type)} onChange={ this.updateStory.bind(this, index) } required /></li>
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
        {this.state.isComplete &&
        <p>{this.getFinalStory()}</p>
        }

        {!this.state.isComplete &&
          <div>
            <ol>
              { this.renderFormFeilds() }
            </ol>
            <button onClick={ this.showPreview }> Finished! </button>
          </div>
        }

      </div>

    )
  }
}

export default Home
