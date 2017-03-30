import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import API from '../../../API'
import STORE from '../../../store'

class ChangePass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      password_new: '',
      registered: !!STORE.token
    }

    this.handlePassChange = this.handlePassChange.bind(this)
    this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePassChange(event) {
    this.setState({password: event.target.value})
  }

  handlePassConfirmChange(event) {
    this.setState({password_new: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let data = {passwords: {old: this.state.password, new: this.state.password_new}}
    API.changePassword(data).then((res) => {
      window.AppNotify("You have successfully changed your password")
    })
    .catch((err) => {
      window.AppNotify("Make sure you old password is correct and try again.")
    })
    }

  render() {

    return (
      <div className='change-form'>
      <form className='sign-up' onSubmit={this.handleSubmit}>
        <div className="row sign-up">
          <div className="six columns">
            <label>Old Password</label>
            <input className="u-full-width"
                   type="password"
                   placeholder="Old Password"
                   required="required"
                   onChange={this.handlePassChange}
                   value={this.state.password}/>
          </div>
          <div className="six columns">
            <label>New Password</label>
            <input className="u-full-width"
                   type="password"
                   placeholder="New Password"
                   required="required"
                   onChange={this.handlePassConfirmChange}
                   value={this.state.password_new}/>
          </div>
          <br/>
          <div>
            <input className="button-primary button" type="submit" value="Submit" />
          </div>
        </div>

      </form>

        <p>Go Back <Link to="/signin">Home!</Link></p>
      </div>


    )
  }
}

export default ChangePass
