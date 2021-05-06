import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import UserAct from '../components/UserProfile/UserAct';
import UserBio from '../components/UserProfile/UserBio'
import UserPost from '../components/UserProfile/UserPost';
import './style/UserPage.css'

const UserPage = () => {

  let match = useRouteMatch()

  return (
    <div className="profile-container">
      <div className="profile-wrapping">
        {/* Start of Top Content */}
        <div className="profile-top-content">
          <img src="https://ik.imagekit.io/alfianpur/Final_Project/Rectangle_71_HTxe4aLXT.png" alt="Hero Profile Banner" />
        </div>
        {/* End of Top Content */}
        {/* Start of Bottom Content */}
        <div className="profile-bottom-content">
          {/* Start of Left Content */}
          <div className="profile-left-content">
            <div className="relative">
              <div className="profile-image">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="Profile" />
              </div>
              <h1>Rafflesia Arnoldi</h1>
              <div className="location">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="loc" />
                <p>Jakarta</p>
              </div>
            </div>
            <button>
              <p>Talk with anonymous</p>
            </button>
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
                  <UserPost/>
                </Route>
                <Route path={`${match.path}/act`}>
                  <UserAct/>
                </Route>
                <Route path={`${match.path}`}>
                  <UserBio/>
                </Route>
              </Switch>
            {/* End Custome Insertion */}
          </div>
          {/* End of Right Content */}
        </div>
        {/* End of Bottom Content */}
      </div>
    </div>
  )
}

export default UserPage
