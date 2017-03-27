import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import API from '../../../API'

import './style.css'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {email: '',
                  password: '',
                  passwordConfirmation: ''}

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
  this.setState({passwordConfirmation: event.target.value})
}

handleSubmit(event) {
  event.preventDefault()
  console.log(this.state.email);
  API.signUp(event).then((res) => {
    console.log(res)
  })
  .catch()
}

  render() {
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
                       value={this.state.passwordConfirmation}/>
              </div>
              <br/>
              <div>
                <input className="button-primary" type="submit" value="Submit" />
              </div>
            </div>

          </form>




          <br/>
          <p> Already have an account? Please <Link to="/signin">Login here!</Link></p>
      </div>
    );
  }
}

export default SignUp;
