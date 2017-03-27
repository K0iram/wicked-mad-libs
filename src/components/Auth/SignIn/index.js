import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {email: '',
                  password: ''}

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  handlePassChange(event) {
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    alert('I did it!' + this.state.email)
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>

        <p>Sign in and start playing now!</p>

          <form className='sign-up' onSubmit={this.handleSubmit}>
            <div className="row sign-up">
              <div className="six columns">
                <label>Your email</label>
                <input className="u-full-width"
                       type="email"
                       placeholder="Email"
                       required="required"
                       onChange={this.handleEmailChange}
                       value={this.state.email}/>
              </div>
              <div className="six columns">
                <label>Your Password</label>
                <input className="u-full-width"
                       type="password"
                       placeholder="Password"
                       required="required"
                       onChange={this.handleEmailChange}
                       value={this.state.email}/>
              </div>
              <br/>
              <div>
                <br/>
                <input className="button-primary" type="submit" value="Submit" />
              </div>
            </div>

          </form>

          <br/>
          <p> Don't have an account? Please <Link to="/signup">Sign Up!</Link></p>
      </div>
    );
  }
}

export default SignIn;
