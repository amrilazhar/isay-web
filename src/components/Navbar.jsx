import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SmsIcon from '@material-ui/icons/Sms';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import "./style/Navbar.css"
import { useSelector } from "react-redux";

const Navbar = () => {
    const [sideMenu, setSideMenu] = useState(false);

    const handleSideMenu = () => 
    (setSideMenu(!sideMenu))

    const user = useSelector (state => state?.users)

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
                    { (!user?.items?.avatar)?
                        <div className="profile-icon-load">
                            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Grey_VyVyqnF1h1.png" alt="profile-icon"/>
                        </div>:
                        <div className="profile-icon">
                            <img src={user?.items?.avatar} alt="profile-icon"/>
                        </div>
                    }
                    
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
