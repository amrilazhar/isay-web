import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { otherUser, userActions } from '../redux/actions';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserAct from '../components/UserProfile/UserAct';
import UserBio from '../components/UserProfile/UserBio'
import UserPost from '../components/UserProfile/UserPost';
import './style/UserPage.css'

const OtherUserPage = () => {

  const {userId} = useParams()

  const dispatch = useDispatch()
  let match = useRouteMatch()

  useEffect(() => {
    dispatch(userActions.getActive())
  },[])

  useEffect(() => {
    dispatch(otherUser.otherUserProfile(userId))
  },[])

  useEffect(() => {
    dispatch(otherUser.otherUserStatus(userId))
  },[])

  const userThisPage = useSelector ((state) => state?.otherUser)
  const statusUpdate = useSelector ((state) => state?.otherUserStatus?.status)

  const userDetail = () => {
    if(userThisPage?.loading){
      return (
        <>
          <div className="relative">
            <div className="profile-image-load">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="Profile" />
            </div>
            <h1> </h1>
            <div className="location-user-load"></div>
          </div>
          <a>
          <button>
            <p>Talk with annonymous</p>
          </button>
          </a>
        </>
      )
    } else {
      return (
        <>
          <div className="relative">
            <div className="profile-image">
              <img src={userThisPage.items?.avatar} alt="Profile" />
            </div>
            <h1>{userThisPage.items?.name}</h1>
            <div className="location-user">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="loc" />
              <p>{userThisPage.items?.location?.city}</p>
            </div>
          </div>
          <a>
            <button>
              <p>Talk with annonymous</p>
            </button>
          </a>
        </>
      )
    }
  }

  return (
    <Router>
      <Navbar/>
      <div className="profile-container">
        <div className="profile-wrapping">
          <div className="profile-top-content">
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Rectangle_71_qGauJCjup.png" alt="Hero Profile Banner" />
          </div>
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
                    <UserAct/>
                  </Route>
                  <Route path={`${match.path}`}>
                    <UserBio bio = {{
                      bio: `${userThisPage.items?.bio}`,
                      interest: [userThisPage.items?.interest]
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

export default OtherUserPage
