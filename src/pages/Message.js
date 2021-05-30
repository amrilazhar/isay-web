import "./style/messagePage.css";

import React, { useEffect } from "react";
import LeftSideMessage from "../components/MessagePage/leftSideMessage";
import MainContentMessage from "../components/MessagePage/mainContentMessage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/actions";

const Message = () => {
  const dispatch= useDispatch();
    
  useEffect(() => {
      dispatch(userActions.getActive())
    },[])
  return (
    <>
      <Navbar />
      <div className="message-page-wrapper">
        <div className="left-message-page">
          <LeftSideMessage />
        </div>
        <div className="content-message-page">
          <MainContentMessage />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Message;
