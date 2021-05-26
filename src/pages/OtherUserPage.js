import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { statusInterest, otherUser } from '../redux/actions';

import { history } from "../helpers";

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
    dispatch(otherUser.otherUserProfile(userId))
  },[])

  useEffect(() => {
    dispatch(otherUser.otherUserStatus(userId))
  },[])

  const userActive = useSelector ((state) => state?.otherUser)
  const statusUpdate = useSelector ((state) => state?.otherUserStatus?.status)

  const userDetail = () => {
    if(userActive?.loading){
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
          {/* <button>
            <p>Logout</p>
          </button>  */}
        </>
      )
    } else {
      return (
        <>
          <div className="relative">
            <div className="profile-image">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="Profile" />
            </div>
            <h1>{userActive.items?.name}</h1>
            <div className="location-user">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="loc" />
              <p>{userActive.items?.location?.city}</p>
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
          {/* Start of Top Content */}
          <div className="profile-top-content">
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Rectangle_71_qGauJCjup.png" alt="Hero Profile Banner" />
          </div>
          {/* End of Top Content */}
          {/* Start of Bottom Content */}
          <div className="profile-bottom-content">
            {/* Start of Left Content */}
            <div className="profile-left-content">
              {userDetail()}
            </div>
            {/* End of Left Content */}
            {/* Start of Right Content */}
            <div className="profile-right-content">
              {/* Start of Button Switch */}
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
              {/* End of Button Switch */}
              {/* Start Custome Insertion */}
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
                      bio: `${userActive.items?.bio}`,
                      interest: [userActive.items?.interest]
                    }}
                    />
                  </Route>
                </Switch>
              {/* End Custome Insertion */}
            </div>
            {/* End of Right Content */}
          </div>
          {/* End of Bottom Content */}
        </div>
      </div>
      <Footer/>
    </Router>
  )
}

export default OtherUserPage
