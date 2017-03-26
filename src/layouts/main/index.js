import React, { Component } from 'react'
import Navigation from '../../components/Navigation'
import './App.css'

class AppLayout extends Component {
  render() {
    return (
      <div className="App">
        <h1>Wicked Mad Libs</h1>
        <Navigation />

        <div className="main-content">
          {this.props.children}
        </div>

      </div>
    );
  }
}

export default AppLayout;
