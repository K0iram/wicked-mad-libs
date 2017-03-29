import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import API from '../../../API'
import STORE from '../../../store'

import './style.css'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      registered: !!STORE.token
    }


    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleEmailChange(event) {
  this.setState({email: event.target.value})
}

handlePassChange(event) {
  this.setState({password: event.target.value})
}

handlePassConfirmChange(event) {
  this.setState({password_confirmation: event.target.value})
}

handleSubmit(event) {
  event.preventDefault()
  let data = {credentials: this.state}
  API.signUp(data).then((res) => {

    let data = {credentials: {email: this.state.email, password: this.state.password}}
    API.signIn(data).then((res) => {
      STORE.user = res.data.user
      STORE.token = res.data.user.token
      window.localStorage.setItem('user', JSON.stringify(res.data.user))

      this.setState({registered: true})
      (window.AppNotify("Thank you for signing up"))
    })
    .catch((err) => {
    window.AppNotify("Something went wrong please try again.")
    })
  })
}

  render() {
    const hasRedirectState = (!!this.props.location.state && !!this.props.location.state.storyId) ? {pathname: `/stories/${this.props.location.state.storyId}`, state: this.props.location.state} : "/home"

    if (this.state.registered) return <Redirect to={hasRedirectState}/>

    return (
      <div>
        <h1>Sign Up</h1>
        <p>In order to be able to save your stories you must create an account</p>
          <form className='sign-up' onSubmit={this.handleSubmit}>
            <div className="row sign-up">
              <div className="six columns">
                <label>Your email</label>

                <input type="email"
                       placeholder="Email"
                       required="required"
                       onChange={this.handleEmailChange}
                       value={this.state.email}/>
              </div>
              <div className="six columns">
                <label>Your Password</label>

                <input type="password"
                       placeholder="Password"
                       required="required"
                       onChange={this.handlePassChange}
                       value={this.state.password}/>
              </div>
              <div className="six columns">
                <label>Confirm Password</label>
                <input type="password"
                       placeholder="Password Confirmation"
                       required="required"
                       onChange={this.handlePassConfirmChange}
                       value={this.state.password_confirmation}/>
              </div>
              <br/>
              <div>
                <input className="button-primary button" type="submit" value="Submit" />
              </div>
            </div>

          </form>




          <br/>
          <p> Already have an account? Please <Link to="/signin">Login here!</Link></p>
          <p> Don't want to save you finished stories? Go back <Link to="/home">home</Link> to keep playing!</p>
      </div>
    );
  }
}

export default SignUp;
