import React, { useEffect } from 'react';
import * as firebase from "firebase/app";
import './App.css';
import Detail from './pages/detail/Detail'
import Home from './pages/home/Home';
import User from './pages/user/User';
import SignUp from './pages/SignUp'
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions/userActions';
import { registerUserObserver, getUserById } from './logic/User';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    registerUserObserver(async(user)=>{
      if(user){
       const profile = await getUserById(user.uid);
       dispatch(setUser(profile));
       console.log("App -> profile", profile) 
      }else{
        console.log("USUARIO HA HECHO LOGOUT")
      }
    })
  }, [])

  return (
      <Router>
        <div>
          <Switch>
            <Route path="/login"component={Login}/>
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
