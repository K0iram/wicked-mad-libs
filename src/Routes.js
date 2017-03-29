import React from 'react';
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'

import AppLayout from './layouts/main'
import About from './components/About'
import Home from './components/Home'
import Stories from './components/Stories'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import LogOut from './components/Auth/LogOut'
import ChangePass from './components/Auth/ChangePass'
import Profile from './components/Profile'





const Routes = () => (
  <Router>
    <AppLayout>
      <Route path="/home" component={Home} />
      <Route exact path="/stories" component={Stories} />
      <Route exact path="/stories/:storyId" component={Stories} />
      <Route path="/about" component={About} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/logout" component={LogOut} />
      <Route path="/changepassword" component={ChangePass} />
      <Route exact path="/profile" component={Profile} />



    </AppLayout>
  </Router>
)

export default Routes
