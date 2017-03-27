import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './style.css'

class SignIn extends Component {
  render() {
    return (
      <div>
        <h1>Sign In</h1>

        <p>Sign in and start playing now!</p>

          <form className='sign-up'>
            <div className="row sign-up">
              <div className="six columns">
                <label>Your email</label>
                <input className="u-full-width" type="email" placeholder="Email" id="exampleEmailInput"/>
              </div>
              <div className="six columns">
                <label>Your Password</label>
                <input className="u-full-width" type="password" placeholder="Password" id="exampleEmailInput"/>
              </div>
            </div>
          </form>
          <br/>

          <input className="button-primary" type="submit" value="Submit" />

          <br/>
          <p> Don't have an account? Please <Link to="/signup">Sign Up!</Link></p>
      </div>
    );
  }
}

export default SignIn;
