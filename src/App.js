import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
//nimport './index.scss';
import Detail from "./pages/detail/Detail";
import Home from "./pages/home/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyEvents from "./pages/myevents/MyEvents";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/actions/userActions";
import { registerUserObserver, getUserById } from "./logic/User";
//import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { firebaseConfig } from "./config";
import Profile from "./components/profile/Profile";
import Chat from "./components/chat/Chat";
import EventCategory from "./components/eventCategory/EventCategory";
import Family from "./pages/Family";
import Sports from "./pages/sports/Sports";
import Music from "./pages/music/Music";
import Theater from "./pages/theater/Theater";

firebase.initializeApp(firebaseConfig);

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    registerUserObserver(async (user) => {
      if (user) {
        const profile = await getUserById(user.uid);
        dispatch(setUser(profile));
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  //Me pide que ponga una dependencia o que borre el array vacio?

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/myevents" component={MyEvents} />
        <Route path="/chat/:id" component={Chat} />
        <Route path="/eventcategory" component={EventCategory} />
        <Route path="/family" component={Family} />
        <Route path="/sports" component={Sports} />
        <Route path="/music" component={Music} />
        <Route path="/theater" component={Theater} />
      </Switch>
    </Router>
  );
}

export default App;
