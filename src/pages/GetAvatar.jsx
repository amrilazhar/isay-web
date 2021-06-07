import img1 from "../assets/confetti-1.png";
import img2 from "../assets/confetti-2.png";
import "./style/getAvatar.css";
import { Link } from "react-router-dom";
import { userActions } from "../redux/actions";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetAvatar = () => {
  const dispatch = useDispatch();
  const autoGenerateProfile = useSelector((state) => state.firstProfileData);

  useEffect(() => {
    dispatch(userActions.getActive());
  }, []);

  return (
    <div className="main-avatar-container" style={{backgroundImage: `url(/img/group-img-isay.png)`}}>
      <div className="main-avatar-wrapper">
        <div className="isay-logo">
          <img src="https://i.ibb.co/S0rvLhh/Logo-Only.png" alt="logo" />
        </div>
        <div className="sub-avatar-container">
          <div className="sub-avatar-wrapper">
            {autoGenerateProfile.loading ? (
              <h1>Loading</h1>
            ) : autoGenerateProfile?.error ? (
              <h1>Error</h1>
            ) : (
              <>
                <h2>Cool ! We identified you as...</h2>
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
                <div className="inside-sub-avatar-container">
                  <div className="inside-sub-avatar-wrapper">
                    <div className="top-text">
                      <div>
                        <img src={img2} alt="confetti-2" />
                        <h3>You are interested in</h3>
                        <img src={img2} alt="confetti-2" />
                      </div>
                    </div>
                    <div>
                      <p>You can change your interest later.</p>
                    </div>
                    <div className="interest-icon">
                      {autoGenerateProfile?.profile?.interest &&
                        autoGenerateProfile?.profile?.interest.map((data) => (
                          <>
                            <div className="interest-icon-container">
                              <img src={data.icon} alt="interest" />
                            </div>
                            <p>{data.interest}</p>
                          </>
                        ))}
                    </div>
                    {/* <div className="interest-text">
                          {autoGenerateProfile?.profile?.interest &&
                            autoGenerateProfile?.profile?.interest.map((data) => {
                              return <p>{data.interest}</p>;
                            })}
                        </div> */}
                    <div className="last-paragraph">
                      <h3>Fun fact</h3>
                      <p>{autoGenerateProfile?.profile?.funfact?.content}</p>
                    </div>
                  </div>
                </div>
                <div className="avatar-btn">
                  <Link to="/login">
                    <button>Lets Start Your Journey</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAvatar;
