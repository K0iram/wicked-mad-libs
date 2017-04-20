import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from '../../API/'
import STORE from '../../store'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css'

const style = {
  margin: 12,
};


class Stories extends Component {

  constructor(props) {
    super(props)


      this.state = {
        templateStore: '',
        requiredWords: [],
        title: '',
        description: '',
        userWords: [],

        finalStory: '',
        isComplete: false
      }

    this.showPreview = this.showPreview.bind(this)
    this.pushPages = this.pushPages.bind(this)

  }

  componentDidMount() {
    if(!!this.props.location.state && !!this.props.location.state.toSave) {
      this.setState(this.props.location.state.toSave)
    } else {

      API.fetchTemplate(this.props.match.params.storyId).then((res) => {
        this.setState({
          templateStore: res.data.template.templateString,
          requiredWords: res.data.template.requiredWords,
          title: res.data.template.title,
          description: res.data.template.description,
          userWords: res.data.template.requiredWords
        })
      })
    }
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
      "$$$ADJECTIVE": "Adjective",
      "$$$FEMALE_NAME": "Name (Female)",
      "$$$BODY_PART": "A Body Part",
      "$$$BODY_ORGAN": "A Human Organ",
      "$$$MALE_NAME": "Name (Male)",
      "$$$VERB_ING": "Verb With ing",
      "$$$CELEB_FEMALE": "Celebrity (Female)",
      "$$$CELEB": "Celebrity",
      "$$$PERSON": "Person In The Room",
      "$$$SILLY_WORD": "A Silly Word",
      "$$$FOOD": "Type of Food",
      "$$$VERB_PAST": "Verb (Past Tense)",
      "$$$NOUN": "Noun",
      "$$$ADVERB": "Adverb",
      "$$$PLURAL_NOUN": "Plural Noun",
      "$$$SHOE_TYPE_PLURAL": "Shoe Type (Plural)",
      "$$$BUG_TYPE": "Type of Bug",
      "$$$VERB": "Verb",
      "$$$EXCLAMATION": "Exclamation!",
      "$$$LIQUID": "A Liquid",
      "$$$FOOD_PLURAL": "Type of Food (plural)"

    }

    return types[type]
  }

  renderFormFeilds() {
    return this.state.requiredWords.map((type, index) => {
      return (
        <TextField
          key={index}
          floatingLabelText={this.getFormattedType(type)}
          type='text'
          className='story-form'
          required='required'
          maxLength='20'
          onChange={ this.updateStory.bind(this, index) } />
      )
    })
  }

  getFinalStory() {
    let storyString = ''
    const {requiredWords, userWords} = this.state

    const tmpCopy = this.state.templateStore.slice(0)
    tmpCopy.map((section, index) => {
      return storyString += section.replace(requiredWords[index], userWords[index])
    })

    return storyString
  }

  showPreview(event) {
    event.preventDefault()

    this.setState({finalStory: this.getFinalStory(), isComplete: true})
  }

  pushPages() {
    let data = {page:{title: this.state.title, body: this.getFinalStory() }}
    event.preventDefault()
    API.pushPages(data).then((res) => {
    })
  }

  render() {

    return (
      <div className="home">
        <h1>{ this.state.title }</h1>
        {this.state.isComplete &&
          <div>
            <p className="final-story">{this.getFinalStory()}</p>
            {
              STORE.token &&
                <Link to='/profile'><button onClick={ this.pushPages }>Save This Lib!</button></Link>
            }
            {
              !STORE.token &&
                <div>
                  <Link
                    className="button-primary btn"
                    to={{pathname: '/signin', state:{toSave: this.state, storyId: this.props.match.params.storyId }}}>
                    <button className="save">Save this lib!</button>
                  </Link>
                  <br/>
                  <h5> You must have an account to save this lib!</h5>
                </div>
            }
          </div>
        }

        {!this.state.isComplete &&
          <div>
            <h5>Please fill in all the fields and press finished to see your custom story!</h5>

            <form className="story" onSubmit={ this.showPreview }>
              { this.renderFormFeilds() }
              <br/>
                <RaisedButton label="Finished" primary={true} style={style} type="submit" value="Submit"/>
                <Link to="/home"><RaisedButton label="Cancel" default={true} style={style}/></Link>
            </form>

          </div>
        }

      </div>

    )
  }
}

export default Stories
