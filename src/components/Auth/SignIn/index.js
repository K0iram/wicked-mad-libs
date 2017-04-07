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

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loggedIn: !!STORE.token
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  handlePassChange(event) {
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let data = {credentials: {email: this.state.email, password: this.state.password}}
    API.signIn(data).then((res) => {
      STORE.user = res.data.user
      STORE.token = res.data.user.token
      window.localStorage.setItem('user', JSON.stringify(res.data.user))

      window.AppNotify("You have successfully logged in as " + this.state.email)
      this.setState({loggedIn: true})
    })
    .catch((err) => {
      window.AppNotify("Something went wrong please check email/password and try again.")
    })
  }

  render() {
    const hasRedirectState = (!!this.props.location.state && !!this.props.location.state.storyId) ? {pathname: `/stories/${this.props.location.state.storyId}`, state: this.props.location.state} : "/home"
    if (this.state.loggedIn) return <Redirect to={hasRedirectState}/>
    return (
      <div>
        <h1>Sign In</h1>

        <p>Sign in and start playing now!</p>

          <form className='sign-in' onSubmit={this.handleSubmit}>
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
              <div>
                <RaisedButton label="Submit" primary={true} style={style} type="submit" value="Submit"/>
              </div>
          </form>

          <br/>
          <p> Don't have an account? Please <Link to={ {pathname: '/signup', state:{hasRedirectState: hasRedirectState}} }>Sign Up!</Link></p>
          <p> Don't want to save you finished stories? Go back <Link to="/home">home</Link> to keep playing!</p>
      </div>
    );
  }
}

export default SignIn;
