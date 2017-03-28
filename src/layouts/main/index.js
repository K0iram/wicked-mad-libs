import React, { Component } from 'react'
import Navigation from '../../components/Navigation'
import Snackbar from 'material-ui/Snackbar';

import './App.css'
import '../../css/skeleton.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'


injectTapEventPlugin()

class AppLayout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      snackbarShow: false,
      message: ''
    }

    window.AppNotify = this.showNotification //super hack
  }

  showNotification = (message) => {
    this.setState({
      snackbarShow: true,
      message: message
    });
  };

  handleRequestClose = () => {
    this.setState({
      snackbarShow: false,
      messag: ''
    });
  };

  renderChildren() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       notify: this.showNotification
     })
    )

    return childrenWithProps
  }


  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Navigation />

          <div className="main-content">
            { this.renderChildren() }
          </div>

          <Snackbar
            open={this.state.snackbarShow}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppLayout;
