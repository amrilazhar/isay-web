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

    return(
        <Router>
          <div className="navbar-container">
            <div className="navbar-wrapper">
                <a href="/">
                    <div className="nav-logo">
                        <img src="https://i.ibb.co/3fLH5bc/Logo-White.png" alt="logo"/>
                    </div>
                </a>
                <div className="search">
                    <input type="text" placeholder="#hashtag"/>
                </div>
                <ul className={sideMenu? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item" >
                        <a href="/">
                        <div className="nav-links" activeClassName="active" > 
                            <HomeIcon/>
                            <p>Home</p>
                        </div>
                        </a>
                    </li>
                    <li className="nav-item" >
                        <a href="/notification">
                            <div className="nav-links" activeClassName="active" > 
                                <NotificationsIcon/>
                                <p>Notifications</p>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item" >
                        <a href="/message">
                            <div className="nav-links" activeClassName="active" >
                                <SmsIcon/>
                                <p>Message</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <a href="/profile">
                    <div className="profile-icon">
                        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="profile-icon"/>
                    </div>
                </a>
                <div className="nav-icon" onClick={handleSideMenu}>
                    {sideMenu ? <CloseIcon/> : <MenuIcon/>}
                </div>
            </div>
        </div>
      </Router>
    )
}

export default Navbar;
