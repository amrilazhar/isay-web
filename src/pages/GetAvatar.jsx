import img1 from "../assets/confetti-1.png";
import img2 from "../assets/confetti-2.png";
import "./style/getAvatar.css"

import React from "react";

const GetAvatar = () => {
    
    return(
        <div className="main-avatar-container">
            <div className="main-avatar-wrapper">
                <div className="sub-avatar-container">
                    <div className="sub-avatar-wrapper">
                        <div className="isay-logo">
                            <img src="https://i.ibb.co/S0rvLhh/Logo-Only.png" alt="logo"/>
                        </div>
                        <h2>Cool ! We identified you as...</h2>
                        <div className="inside-sub-avatar-container">
                            <div className="inside-sub-avatar-wrapper">
                                <div className="avatar-name-wrapper">
                                    <div className="avatar">
                                        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="avatar"/>
                                    </div>
                                    <p>Anpanman</p>
                                    <img src={img1} alt="confetti1" className="confetti-1"/>
                                </div>
                                <div className="top-text">
                                <div>
                                    <img src={img2} alt="confetti-2"/>
                                    <h4>You are interested in</h4>
                                    <img src={img2} alt="confetti-2"/>
                                </div>
                                <p>You can change your interest later.</p>
                                </div>
                                <div className ="interest-icon">
                                    <div className="interest-icon-container">
                                        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png"alt="interest"/>
                                    </div>
                                    <div className="interest-icon-container">
                                        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png"alt="interest"/>
                                    </div>
                                    <div className="interest-icon-container">
                                        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png"alt="interest"/>
                                    </div>
                                    <div className="interest-icon-container">
                                        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png"alt="interest"/>
                                    </div>
                                    </div>
                                    <div className="interest-text">
                                        <p>Sports</p>     
                                        <p>Sports</p>
                                        <p>Sports</p>
                                        <p>Sports</p>
                                    </div>
                                </div>
                                <h4>Fun fact</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id nisl, tempor dui consequat sit egestas. Dui diam proin tortor quis etiam lacus. Diam velit aliquam aliquam urna sed faucibus.</p>
                        </div>
                        <button>Devine your Avatar</button>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default GetAvatar;