import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { history } from "../helpers";

import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SmsIcon from '@material-ui/icons/Sms';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import "./style/Navbar.css"



const Navbar = () => {
    const [sideMenu, setSideMenu] = useState(false);

    const handleSideMenu = () => 
    (setSideMenu(!sideMenu))

    const toProfile = () => (
        history.push('profile')
    )

    const toFeed = () => (
        history.replace('')
    )

    const toNotif = () => (
        history.push('notification')
    )

    const toMessage = () => (
        history.push('message')
    )


    return(
        <Router>
          <div className="navbar-container">
            <div className="navbar-wrapper">
                <div className="nav-logo" onClick={toFeed}>
                    <img src="https://i.ibb.co/3fLH5bc/Logo-White.png" alt="logo"/>
                </div>
                <div className="search">
                    <input type="text" placeholder="#hashtag"/>
                </div>
                <ul className={sideMenu? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item" >
                        {/* <Link to={`/`} className="nav-links" activeClassName="active">
                            <HomeIcon/>
                            <p>Home</p>
                        </Link> */}
                        <div onClick={toFeed} className="nav-links" activeClassName="active" > 
                            <HomeIcon/>
                            <p>Home</p>
                        </div>
                    </li>
                    <li className="nav-item" >
                        <div onClick={toNotif} className="nav-links" activeClassName="active" > 
                            <NotificationsIcon/>
                            <p>Notifications</p>
                        </div>
                    </li>
                    <li className="nav-item" >
                        <div onClick={toMessage} className="nav-links" activeClassName="active" >
                            <SmsIcon/>
                            <p>Message</p>
                        </div>
                    </li>
                </ul>
                <div className="profile-icon" onClick={toProfile}>
                    <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="profile-icon"/>
                </div>
                <div className="nav-icon" onClick={handleSideMenu}>
                    {sideMenu ? <CloseIcon/> : <MenuIcon/>}
                </div>
            </div>
        </div>
      </Router>
    )
}

export default Navbar;
