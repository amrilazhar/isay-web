import "./style/messagePage.css";

import React from "react";
import LeftSideMessage from "../components/MessagePage/leftSideMessage";
import MainContentMessage from "../components/MessagePage/mainContentMessage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Message = () => {
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
