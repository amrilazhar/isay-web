import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import FlashMessage from "../components/FlashMessage";
import { alertActions, userActions } from "../redux/actions";
import { googleClient } from "../helpers/google.client";
import { GoogleLogin } from "react-google-login";
import logo from '../assets/isay-white.png'
import appstore from '../assets/appstore.png'
import playstore from '../assets/gplay.png'
import './style/signup.css'

function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = inputs;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password && confirmPassword) {
      const { from } = location.state || { from: { pathname: "/verify" } };
      dispatch(userActions.register(email, password, confirmPassword, from));
    } else {
      dispatch(alertActions.error("Email and password not accepted"));
    }
  }

  function handleSubmitGoogle(token) {
    if (token) {
      const { from } = location.state || { from: { pathname: "/verify" } };
      dispatch(userActions.registerGoogle(token.tokenId, from));
    } else {
      dispatch(alertActions.error("Google Authentication failed"));
    }
  }

  function handleFailureGoogle() {
    dispatch(alertActions.error("Google Authentication failed"));
  }

  const alert = useSelector((state) => state.alert);

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="signup-container">
      {alert.alert ? <FlashMessage /> : ""}
      <div className="signup-wrapper">
        <div className="left-content-signup" style={{backgroundImage: `url(/img/left-img-isay.png)`}}>
          <div className="logo">
            <img src={logo} alt="i say logo" />
          </div>
          <h2>See life from a different perspective.</h2>
          <div className="download-button">
            <Link to ="#"><img src={appstore} alt="Download on App Store" /></Link>
            <Link to ="#"><img src={playstore} alt="Get it on Google Play" /></Link>
          </div>
        </div>
        <div className="right-content-signup" style={{backgroundImage: `url(/img/right-img-isay.png)`}}>
          <div className="login-wrapper">
            <h2>Sign Up</h2>
            <form name="form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Type your email"
                value={email}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">Create a Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="xxxx-xxxx-xxxx"
                value={password}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">Confirm your Password</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="xxxx-xxxx-xxxx"
                value={confirmPassword}
                onChange={handleChange}
              />
              <br />
              <input type="submit" value="Create an Account" />
            </form>
            <GoogleLogin
              clientId={googleClient.GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src="https://img.icons8.com/color/50/000000/google-logo.png"
                    alt="Google Logo"
                  />{" "}
                  Signup with Google
                </button>
              )}
              buttonText="Sign Up"
              onSuccess={handleSubmitGoogle}
              onFailure={handleFailureGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <p>
              Already has an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
