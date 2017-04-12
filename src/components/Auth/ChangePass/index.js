import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import API from '../../../API'
import STORE from '../../../store'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css'

const style = {
  margin: 12,
};

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
    this.clearValue = this.clearValue.bind(this)
  }

  clearValue() {
    this.setState({password: '', password_new: ''})
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
      this.clearValue()
      window.AppNotify("You have successfully changed your password")
    })
    .catch((err) => {
      window.AppNotify("Make sure you old password is correct and try again.")
    })
    }

  render() {

    return (
      <div>
        <h2> Change your password </h2>
      <form className='change-pass' onSubmit={this.handleSubmit}>
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
            <Link to="/home"><RaisedButton label="Cancel" default={true} style={style}/></Link>
          </div>
      </form>

      </div>


    )
  }
}

export default ChangePass
