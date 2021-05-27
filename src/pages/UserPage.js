//Used Library
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

//Action
import { statusInterest, userActions } from '../redux/actions';

//Helpers
import { history } from "../helpers";

//Component and Styling
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserAct from '../components/UserProfile/UserAct';
import UserBio from '../components/UserProfile/UserBio'
import UserPost from '../components/UserProfile/UserPost';
import './style/UserPage.css'

const UserPage = () => {

  const dispatch = useDispatch()
  let match = useRouteMatch()

  //First get data dispatch
  //User active data
    useEffect(() => {
      dispatch(userActions.getActive())
    },[])
  //User active status
    useEffect(() => {
      dispatch(statusInterest.getStatusUser())
    },[])

  //Selecting user active data and status
  const userActive = useSelector ((state) => state?.users)
  const statusUpdate = useSelector ((state) => state?.statusUser?.status)

  //Logout button
  const logout = () => {
    dispatch(userActions.logout());
    history.replace('')
  }

  //Component left of user detail
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
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="loc" />
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

  return (
    <Router>
      <Navbar/>
      <div className="profile-container">
        <div className="profile-wrapping">
          <div className="profile-top-content">
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Rectangle_71_HTxe4aLXT.png" alt="Hero Profile Banner" />
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
                      bio: `${userActive.items?.bio}`,
                      interest: [userActive.items?.interest]
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
