import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ActionHome from 'material-ui/svg-icons/action/home'
import LogoSrc from '../../logo.png'


import STORE from '../../store'

class Login extends Component {
  static muiName = 'FlatButton'

  render() {
    return (
      <Link to="/signin"><FlatButton {...this.props} label="Login" /></Link>
    );
  }
}

const styles = {
  title: {
  cursor: 'pointer',
  width: 220,
  padding: 10,
  },
  smallIcon: {
  width: 36,
  height: 36,
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
    <Link to="/profile"><MenuItem primaryText="Profile" /></Link>
    <Link to="/changepassword"><MenuItem primaryText="ChangePassword" /></Link>
    <Link to="/logout"><MenuItem primaryText="Sign out" /></Link>
  </IconMenu>
)

Logged.muiName = 'IconMenu';

class Navigation extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      logged: !!STORE.token,
    }
      this.handleTouchTap = this.handleTouchTap.bind(this)
  }

  componentWillReceiveProps() {
    this.setState({ logged: !!STORE.token})
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }

  handleTouchTap() {
    console.log(this.context.history)
    this.props.history.push('/home')
  }

  renderAppBarTitle() {
    return (
      <img className='logo' src={LogoSrc} alt='logo' style={styles.title}/>
  )
  }


  render() {
    return (

      <AppBar
        className="nav-bar"
        title={this.renderAppBarTitle()}
        onTouchTap={this.handleTouchTap}
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

export default withRouter(Navigation)
