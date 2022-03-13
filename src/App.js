import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Navigation from './Giaodienweb/Navigation';
import Home from './Giaodienweb/Home'
import Products from './Giaodienweb/Products'
import About from './Giaodienweb/About'
import Error from './Giaodienweb/Error'

import './App.css';

const App = () => {
  return (
    <Router>
      <Navigation/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/products">
            <Products />
          </Route>

          <Route path="/:somestring">
            <Error />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
