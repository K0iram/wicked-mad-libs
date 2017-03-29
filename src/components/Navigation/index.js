import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';


import STORE from '../../store'

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <Link to="/signin"><FlatButton {...this.props} label="Login" /></Link>
    );
  }
}

const styles = {
  smallIcon: {
  width: 36,
  height: 36,
},
mediumIcon: {
  width: 48,
  height: 48,
},
largeIcon: {
  width: 60,
  height: 60,
},
};

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/home"><MenuItem primaryText="Home" /></Link>
    <Link to="/changepassword"><MenuItem primaryText="ChangePassword" /></Link>
    <Link to="/logout"><MenuItem primaryText="Sign out" /></Link>
  </IconMenu>
)

Logged.muiName = 'IconMenu';

class Navigation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      logged: !!STORE.token,
    }
  }

  componentWillReceiveProps() {
    this.setState({ logged: !!STORE.token})
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }


  render() {
    return (

      <AppBar
        className="nav-bar"
        title="Wicked Mad Libs"
        iconElementLeft={
          <Link to='/home'>
          <IconButton
          iconStyle={styles.smallIcon}
          style={styles.small}>
          <ActionHome />
          </IconButton>
          </Link>
          }
        iconElementRight={this.state.logged ? <Logged/> : <Login />}
      />
    )
  }
}

<IconButton iconStyle={styles.smallIcon} style={styles.small}><ActionHome /></IconButton>
export default Navigation
