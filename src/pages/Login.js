import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage';
import { alertActions, userActions } from '../redux/actions'
import { googleClient } from '../helpers/google.client'
import { GoogleLogin } from "react-google-login";
import logo from '../assets/isay-white.png'
import './style/login.css'

function Login() {

  const [inputs, setInputs] = useState({
      email: '',
      password: ''
  });
  
  const { email, password } = inputs;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => { 
      dispatch(userActions.logout()); 
  }, []);
  
  function handleChange(e) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
      e.preventDefault();

      if (email && password) {
        // get return url from location state or default to home page
        const { from } = location.state || { from: { pathname: "/check" } };
        dispatch(userActions.login(email, password, from));
      } else {
        dispatch(alertActions.error("Email and password not accepted"));
      }

  }

  const alert = useSelector ((state) => state.alert)

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className="login-container">
      {
        alert.alert ? <FlashMessage/> : ""
      }
      <div className="login-wrapper">
        <div className="left-content-login">
          <div className="logo">
            <img src={logo} alt="i say logo" />
          </div>
          <h2>See life from a different perspective.</h2>
          <div className="download-button">
            <Link to ="#"><img src="https://www.pngkit.com/png/full/322-3225520_download-the-app-available-on-the-app-store.png" alt="Download on App Store" /></Link>
            <Link to ="#"><img src="https://www.talkatone.com/wp-content/themes/talkatone/img/get-app-google-play.png" alt="Get it on Google Play" /></Link>
          </div>
        </div>
        <div className="right-content-login">
          <div className="login-wrapper">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label><br />
              <input type="email" name="email" id="email" placeholder="Type your email" value={email} onChange={handleChange}/><br />
              <label htmlFor="password">Password</label><br />
              <input type="password" name="password" id="password" placeholder="xxxx-xxxx-xxxx" value={password} onChange={handleChange}/><br />
              <input type="submit" value="Login" />
            </form>
            <GoogleLogin
              clientId={googleClient.GOOGLE_CLIENT_ID}
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="https://img.icons8.com/color/50/000000/google-logo.png" alt="Google Logo"/> Login with Google</button>
              )}
              buttonText="Log In"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <p>New member? <Link to="/signup">Sign Up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login