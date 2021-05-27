import "./style/notification.css"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LeftSide from "../components/NotifPage/LeftSideNotif";
import ContentNotification from "../components/NotifPage/ContentNotification";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { otherUser }from "../redux/actions"

const Notification = () => {
    const dispatch = useDispatch();
    const otherUserActivityData = useSelector((state) => state.otherUserActivity)
    console.log('otherUserActivityData', otherUserActivityData)

    useEffect(() => {
        dispatch(otherUser.otherUserActivity())
    },[]);

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
