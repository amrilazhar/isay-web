import "./style/notification.css"
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import LeftSide from "../components/NotifPage/LeftSideNotif";
import ContentNotification from "../components/NotifPage/ContentNotification";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userActions } from "../redux/actions";

const Notification = () => {
    const dispatch= useDispatch();
    
    useEffect(() => {
        dispatch(userActions.getActive())
      },[])
    
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
