import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

import { statusInterest, userActions } from '../redux/actions';

import { history } from "../helpers";

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserAct from '../components/UserProfile/UserAct';
import UserBio from '../components/UserProfile/UserBio'
import UserPost from '../components/UserProfile/UserPost';
import FlashMessage from '../components/FlashMessage'
import './style/UserPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPage = () => {

  const dispatch = useDispatch()
  let match = useRouteMatch()

  useEffect(() => {
      dispatch(userActions.getActive())
    },[])

  useEffect(() => {
      const page = 1
      dispatch(statusInterest.getStatusUser(page))
    },[])

  const userActive = useSelector ((state) => state?.users)
  const statusUpdate = useSelector ((state) => state?.statusUser?.status)

  const logout = () => {
    dispatch(userActions.logout());
    history.replace('')
  }

  const userDetail = () => {
    if(userActive.loading){
      return (
        <>
          <div className="relative">
            <div className="profile-image-load">
              <img src=" " alt="Profile" />
            </div>
            <h1> </h1>
            <div className="location-user-load"></div>
          </div>
          <a>
          <button>
            <p>Profile Setting</p>
          </button>
          </a>
          <button>
            <p>Logout</p>
          </button> 
        </>
      )
    } else {
      return (
        <>
          <div className="relative">
            <div className="profile-image">
              <img src={userActive.items?.avatar} alt="Profile" />
            </div>
            <h1>{userActive.items?.name}</h1>
            <div className="location-user">
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="1x" color="#4f4f4f"/>
              <p>{userActive.items?.location?.city}</p>
            </div>
          </div>
          <a href="/setting">
            <button>
              <p>Profile Setting</p>
            </button>
          </a>
          <button onClick={logout}>
            <p>Logout</p>
          </button>
        </>
      )
    }
  }

  const alert = useSelector ((state) => state.alert)

  const [widthHeader, setWidthHeader] = useState(null)
  const [heightHeader, setHeightHeader] = useState(null)

  const img = new Image();
    img.onload = function() {
    setWidthHeader(this.width)
    setHeightHeader(this.height)
  }
  img.src = `${userActive.items?.backgroundImage}`;

  return (
    <Router>
      {
        alert.alert ? <FlashMessage/> : ""
      }
      <Navbar/>
      <div className="profile-container">
        <div className="profile-wrapping">
          { (userActive.loading)?
            <div className="profile-top-content" style={{border:"0.1rem solid var(--border)", boxSizing:"border-box"}}>
              <div className="waiting-background">
                <p>waiting</p>
              </div>
            </div>
            :
            <div className="profile-top-content">
              <img src={userActive.items?.backgroundImage} alt="Hero Profile Banner"
              
              style={
                (widthHeader > heightHeader)?
                {height: "100%"}
                :
                {height: "100%"}
              }
              
              />
            </div>
          }
          <div className="profile-bottom-content">
            <div className="profile-left-content">
              {userDetail()}
            </div>
            <div className="profile-right-content">
              <div className="switch-page-btn">
                <div className="menu-item">
                  <Link to={`${match.url}`}>Profile</Link>
                  <div className="strip" />
                </div>
                <div className="menu-item">
                  <Link to={`${match.url}/post`}>Post</Link>
                  <div className="strip" />
                </div>
                <div className="menu-item">
                  <Link to={`${match.url}/act`}>Activities</Link>
                  <div className="strip" />
                </div>
              </div>
                <Switch>
                  <Route path={`${match.path}/post`}>
                    <UserPost post = {
                      statusUpdate
                    }
                    />
                  </Route>
                  <Route path={`${match.path}/act`}>
                    <UserAct
                      userId = {userActive.items?._id}
                      userName ={userActive.items?.name}
                    />
                  </Route>
                  <Route path={`${match.path}`}>
                    <UserBio bio = {{
                      bio: `${userActive.items?.bio}`,
                      interest: [userActive.items?.interest],
                      id: `${userActive.items?._id}`
                    }}
                    />
                  </Route>
                </Switch>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </Router>
  )
}

export default UserPage
