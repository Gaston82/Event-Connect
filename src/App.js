import React from 'react';
import logo from './logo.svg';
import './App.css';
import Detail from './pages/detail/Detail'
import Home from './pages/home/Home';
import User from './pages/user/User';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/"exact component={Home}/>
            <Route path="/user"exact component={User}/>
            <Route path="/detail/:id" component={Detail}/>
          </Switch>
        </div>
      </Router>
    
  );
}

export default App;
