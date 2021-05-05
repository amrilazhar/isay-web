import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions'
import './style/signup.css'

function Signup() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="left-content-signup">
          <div className="logo">
            <img src="https://i.ibb.co/qsXVjSt/Group-147.png" alt="i say logo" />
          </div>
          <h2>See life from a different perspective.</h2>
          <div className="download-button">
            <Link to ="#"><img src="https://www.pngkit.com/png/full/322-3225520_download-the-app-available-on-the-app-store.png" alt="Download on App Store" /></Link>
            <Link to ="#"><img src="https://www.talkatone.com/wp-content/themes/talkatone/img/get-app-google-play.png" alt="Get it on Google Play" /></Link>
          </div>
        </div>
        <div className="right-content-signup">
          <div className="login-wrapper">
            <h2>Sign Up</h2>
            <form name="form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label><br />
              <input type="email" name="email" id="email" placeholder="Type your email" value={user.email} onChange={handleChange}/><br />
              <label htmlFor="password">Create a Password</label><br />
              <input type="password" name="password" id="password" placeholder="xxxx-xxxx-xxxx" value={user.password} onChange={handleChange}/><br />
              <label htmlFor="password">Confirm your Password</label><br />
              <input type="password" name="confirmpassword" id="confirmpassword" placeholder="xxxx-xxxx-xxxx" /><br />
              <input type="submit" value="Create an Account" />
            </form>
            <button><img src="https://img.icons8.com/color/50/000000/google-logo.png" alt="Google Logo"/> Signup with Google</button>
            <p>Already has an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
