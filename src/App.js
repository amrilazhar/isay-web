import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { history } from './helpers/history'
import { alertActions } from './redux/actions'
import { PrivateRoute } from './redux/PrivateRoute'


import FeedPage from './pages/FeedPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';
import SignupQuest from "./pages/SignupQuest";
import Notification from './pages/Notification';
import GetAvatar from './pages/GetAvatar';
import Message from './pages/Message';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      history.listen((location, action) => {
          dispatch(alertActions.clear());
      });
  }, []);

  return (
    <div className="app">
      <Router history={history}>
          <Switch>
              <PrivateRoute exact path="/" component={FeedPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/signupquest/:id"component={SignupQuest} />
              <PrivateRoute path="/avatar" component={GetAvatar} />
              <PrivateRoute path="/notification" component={Notification} />
              <PrivateRoute path="/profile" component={UserPage} />
              <PrivateRoute path="/message" component={Message} />
              <Redirect from="*" to="/" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
