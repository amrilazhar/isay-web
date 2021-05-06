import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { history } from './helpers/history'
import { alertActions } from './redux/actions'
import { PrivateRoute } from './redux/PrivateRoute'


import FeedPage from './pages/FeedPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';
import InputLocation from './pages/SIgnUpQuest/InputLocation';
import InputInterest from './pages/SIgnUpQuest/InputInterest';
import InputActivity from './pages/SIgnUpQuest/InputActivity';


function App() {

  // const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Router history={history}>
          <Switch>
              <PrivateRoute exact path="/" component={FeedPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/location" component={InputLocation} />
              <Route path="/interest" component={InputInterest} />
              <Route path="/activity"component={InputActivity} />
              <PrivateRoute path="/profile" component={UserPage} />
              <Redirect from="*" to="/" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
