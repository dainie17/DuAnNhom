import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Home from './Giaodienweb/Home'
import Products from './Giaodienweb/Products'
import About from './Giaodienweb/About'
import Error from './Giaodienweb/Error'
import Editsanpham from './ChucNang/editproduct'
import Editdanhmuc from './ChucNang/editdanhmuc'
import Adddanhmuc from './ChucNang/addDanhMuc';

import './App.css';

const App = () => {
  return (
    <Router>
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

          <Route path={"/editsanpham/:id"} children={<Editsanpham/>}>
          </Route>
         
         <Route path={"/editdanhmuc/:id"} children={<Editdanhmuc/>}>
           </Route> 

           <Route path="/addDM">
            <Adddanhmuc />
          </Route>

           <Route path="/:somestring">
            <Error />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
