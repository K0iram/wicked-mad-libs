import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <p>In order to be able to save your stories you must create an account</p>

        <span>Please Enter A Valid Email</span>
        <input type='text' placeholder="Email" required />
        <span>Please Enter Password</span>
        <input type='text' placeholder="Password" required />
        <span>Please Confirm Your Password</span>
        <input type='text' placeholder="Password Confirmation" required />

        <button>Submit</button>

      </div>
    );
  }
}

export default SignUp;
