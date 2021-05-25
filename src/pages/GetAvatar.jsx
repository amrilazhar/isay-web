import img1 from "../assets/confetti-1.png";
import img2 from "../assets/confetti-2.png";
import "./style/getAvatar.css";
import {Link} from "react-router-dom";
import { userActions } from "../redux/actions";


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetAvatar = () => {
    const dispatch = useDispatch();
    const autoGenerateProfile = useSelector((state) => state.firstProfileData);
    console.log('autoGenerateProfile', autoGenerateProfile)

    useEffect(() => {
        dispatch(userActions.getActive())
    },[])

    return (
        <div className="main-avatar-container">
          <div className="main-avatar-wrapper">
            <div className="sub-avatar-container">
              <div className="sub-avatar-wrapper">
                <div className="isay-logo">
                  <img src="https://i.ibb.co/S0rvLhh/Logo-Only.png" alt="logo" />
                </div>
                {autoGenerateProfile.loading ? (
                  <h1>Loading</h1>
                ) : autoGenerateProfile?.error ? (
                  <h1>Error</h1>
                ) : (
                  <>
                    <h2>Cool ! We identified you as...</h2>
                    <div className="inside-sub-avatar-container">
                      <div className="inside-sub-avatar-wrapper">
                        <div className="avatar-name-wrapper">
                          <div className="avatar">
                            <img
                              src={autoGenerateProfile?.profile?.avatar}
                              alt="avatar"
                            />
                          </div>
                          <p>{autoGenerateProfile?.profile?.name}</p>
                          <img src={img1} alt="confetti1" className="confetti-1" />
                        </div>
                        <div className="top-text">
                          <div>
                            <img src={img2} alt="confetti-2" />
                            <h4>You are interested in</h4>
                            <img src={img2} alt="confetti-2" />
                          </div>
                          <p>You can change your interest later.</p>
                        </div>
                        <div className="interest-icon">
                          {autoGenerateProfile?.profile?.interest &&
                            autoGenerateProfile?.profile?.interest.map((_) => (
                              <div className="interest-icon-container">
                                <img
                                  src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png"
                                  alt="interest"
                                />
                              </div>
                            ))}
                        </div>
                        <div className="interest-text">
                          {autoGenerateProfile?.profile?.interest &&
                            autoGenerateProfile?.profile?.interest.map((interest) => {
                              return <p>{interest.interest}</p>;
                            })}
                        </div>
                      </div>
                      <h4>Fun fact</h4>
                      <p>
                      {autoGenerateProfile?.profile?.funfact?.content}
                      </p>
                    </div>
                    <Link to="/login">
                      <button>Devine your Avatar</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };

export default GetAvatar;
