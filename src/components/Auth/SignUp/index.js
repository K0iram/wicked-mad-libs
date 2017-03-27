import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css'

class SignUp extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <p>In order to be able to save your stories you must create an account</p>

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
              <div className="six columns">
                <label>Confirm Password</label>
                <input className="u-full-width" type="password" placeholder="Password Confirmation" id="exampleEmailInput"/>
              </div>
            </div>
          </form>
          <br/>

          <input className="button-primary" type="submit" value="Submit" />

          <br/>
          <p> Already have an account? Please <Link to="/signin">Login here!</Link></p>
      </div>
    );
  }
}

export default SignUp;
