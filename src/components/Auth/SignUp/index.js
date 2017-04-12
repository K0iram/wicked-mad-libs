import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import API from '../../../API'
import STORE from '../../../store'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css'


const style = {
  margin: 12,
};

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
    this.handleLogin = this.handleLogin.bind(this)
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

  API.signUp(data).then(this.handleLogin)
    .catch(() => {
      window.AppNotify("Something went wrong please try again.")
    })
}

handleLogin = () => {
  let data = {credentials: {email: this.state.email, password: this.state.password}}
  API.signIn(data).then((res) => {

    STORE.user = res.data.user
    STORE.token = res.data.user.token
    window.localStorage.setItem('user', JSON.stringify(res.data.user))
    this.setState({registered: true})
    window.AppNotify("Thank you for signing up")
  })
}

  render() {
    const hasRedirectState = (!!this.props.location.state && !!this.props.location.state.hasRedirectState) ? this.props.location.state.hasRedirectState : "/home"

    if (this.state.registered) return <Redirect to={hasRedirectState}/>

    return (
      <div className='upForm'>
        <h2>Sign Up</h2>

          <form className='sign-up' onSubmit={this.handleSubmit}>
                <TextField
                    floatingLabelText="Email"
                    type="email"
                    required="required"
                    onChange={this.handleEmailChange}
                    value={this.state.email}/>
                  <TextField
                      floatingLabelText="Password"
                      type="password"
                      required="required"
                      onChange={this.handlePassChange}
                      value={this.state.password}/>
                  <TextField
                      floatingLabelText="Password Confirmation"
                      type="password"
                      required="required"
                      onChange={this.handlePassConfirmChange}
                      value={this.state.password_confirmation}/>
              <div>
                <RaisedButton label="Submit" primary={true} style={style} type="submit" value="Submit"/>
              </div>
              <p> Already have an account? Please <Link to="/signin">Login here!</Link></p>
          </form>
          <p> Don't want to save you finished stories? Go back <Link to="/home">home</Link> to keep playing!</p>
      </div>
    );
  }
}

export default SignUp;
