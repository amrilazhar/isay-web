import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../redux/actions'
import './style/login.css'

function Login() {

  const [inputs, setInputs] = useState({
      email: '',
      password: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const { email, password } = inputs;
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => { 
      dispatch(userActions.logout()); 
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function handleChange(e) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
      e.preventDefault();

      setSubmitted(true);
      if (email && password) {
          // get return url from location state or default to home page
          const { from } = location.state || { from: { pathname: "/" } };
          dispatch(userActions.login(email, password, from));
      }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="left-content-login">
          <div className="logo">
            <img src="https://i.ibb.co/qsXVjSt/Group-147.png" alt="i say logo" />
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
              <input type="text" name="email" id="email" placeholder="Type your email" value={email} onChange={handleChange}/><br />
              <label htmlFor="password">Password</label><br />
              <input type="password" name="password" id="password" placeholder="xxxx-xxxx-xxxx" value={password} onChange={handleChange}/><br />
              <input type="submit" value="Login" />
            </form>
            <button><img src="https://img.icons8.com/color/50/000000/google-logo.png" alt="Google Logo"/>Login with Google</button>
            <p>New member? <Link to="/signup">Sign Up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login