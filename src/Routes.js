import React from 'react';
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'

import AppLayout from './layouts/main'
import About from './components/About'
import Home from './components/Home'
import Stories from './components/Stories'


const Routes = () => (
  <Router>
    <AppLayout>
      <Route path="/home" component={Home} />
      <Route path="/stories" component={Stories} />
      <Route path="/about" component={About} />
    </AppLayout>
  </Router>
)

export default Routes
