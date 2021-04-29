import React from 'react'
import { Link } from "react-router-dom";
import './css/Signup.css'

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="left-content">
          <div className="logo">
            <img src="https://i.ibb.co/qsXVjSt/Group-147.png" alt="i say logo" />
          </div>
          <h2>See life from a different perspective.</h2>
          <div className="download-button">
            <Link to ="#"><img src="https://www.pngkit.com/png/full/322-3225520_download-the-app-available-on-the-app-store.png" alt="Download on App Store" /></Link>
            <Link to ="#"><img src="https://www.talkatone.com/wp-content/themes/talkatone/img/get-app-google-play.png" alt="Get it on Google Play" /></Link>
          </div>
        </div>
        <div className="right-content">
          <div className="login-wrapper">
            <h2>Sign Up</h2>
            <form action="post">
              <label htmlFor="email">Email</label><br />
              <input type="email" name="email" id="email" placeholder="Type your email" /><br />
              <label htmlFor="password">Create a Password</label><br />
              <input type="password" name="password" id="password" placeholder="xxxx-xxxx-xxxx" /><br />
              <label htmlFor="password">Confirm your Password</label><br />
              <input type="password" name="confirmpassword" id="confirmpassword" placeholder="xxxx-xxxx-xxxx" /><br />
              <input type="submit" value="Create an Account" />
            </form>
            <button><img src="https://img.icons8.com/color/50/000000/google-logo.png" alt="Google Logo"/> Signup with Google</button>
            <p>Already has an account? <Link to="/Login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
