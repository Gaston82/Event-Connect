import React from 'react';
import * as firebase from "firebase/app";
import './App.css';
import Detail from './pages/detail/Detail'
import Home from './pages/home/Home';
import User from './pages/user/User';
import SignUp from './pages/SignUp'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/signup"component={SignUp}/>
            <Route path="/"exact component={Home}/>
            <Route path="/user"exact component={User}/>
            <Route path="/detail/:id" component={Detail}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
