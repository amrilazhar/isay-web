import React from "react";

import LeftSide from "../components/NotifPage/LeftSideNotif"
import ContentNotification from "../components/NotifPage/ContentNotification"
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import "./style/notification.css"

const Notification = () => {
    return(
        <>
        <Navbar/>
        <div className="notification-container">
            <div className="notification-wrapper">
                <div className="left-container">
                    <LeftSide/>
                </div>
                <div className="right-container">
                    <ContentNotification/>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Notification;
