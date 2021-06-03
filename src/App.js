import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { history } from './helpers/history'
import { alertActions } from './redux/actions'
import { PrivateRoute } from './redux/PrivateRoute'
import { PrivateRouteInterest } from './redux/PrivateRouteInterest'

import "./app.css"

import FeedPage from './pages/FeedPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';
import SignupQuest from "./pages/SignupQuest";
import Notification from './pages/Notification';
import GetAvatar from './pages/GetAvatar';
import Message from './pages/Message';
import ProfileSetting from './pages/ProfileSetting'
import OtherUserPage from './pages/OtherUserPage';
import SingleStatus from './pages/SingleStatus';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faComments as fasFaComments, faComment as fasFaComment, faThumbsUp as fasFaThumbsUp, faMapMarkerAlt as fasFaMapMarkerAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import { faComments as farFaComments, faComment as farFaComment, faThumbsUp as farFaThumbsUp } from '@fortawesome/free-regular-svg-icons'
import CheckPage from './pages/CheckPage';

function App() {

  library.add(fasFaComments, fasFaComment, fasFaThumbsUp, farFaComments, farFaComment, farFaThumbsUp, faMapMarkerAlt)

  const dispatch = useDispatch();

  function setTheme (themeName) {
    localStorage.setItem ('theme', themeName)
  }

  (function() {
    if(localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  })();

  useEffect(() => {
      history.listen((location, action) => {
          dispatch(alertActions.clear());
      });
  }, []);

  const themeUsed = localStorage.getItem('theme')

  return (
    <div className={`app ${themeUsed}`}>
      <Router history={history}>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/check"component={CheckPage} />
              <PrivateRoute path="/signupquest/:id"component={SignupQuest} />
              <PrivateRoute path="/avatar" component={GetAvatar} />
              <PrivateRouteInterest path="/notification" component={Notification} />
              <PrivateRouteInterest path="/profile" component={UserPage} />
              <PrivateRouteInterest path="/user/:userId" component={OtherUserPage} />
              <PrivateRouteInterest path="/status/:statusId" component={SingleStatus} />
              <PrivateRouteInterest path="/message" component={Message} />
              <PrivateRouteInterest path="/setting" component={ProfileSetting} />
              <PrivateRouteInterest path="/" component={FeedPage} />
              <Redirect from="*" to="/" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
