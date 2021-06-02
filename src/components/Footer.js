import React from 'react'
import logoWhite from '../assets/isay-white.png';
import logoBlack from '../assets/isay-black.png';
import './style/Footer.css'

const Footer = () => {
  const theme = localStorage.getItem('theme')

  return (
    <div className="footer-container">
      <div className="footer-wrapping">
        <div className="left">
          { (theme === "dark")?
          <img src="https://i.ibb.co/XbcLxHP/Logo-Black.png" alt="logo" widhth="130px" height="56px"/>:
          <img src="https://i.ibb.co/3fLH5bc/Logo-White.png" alt="logo" widhth="130px" height="56px"/>
          }
        </div>
        <div className="left-middle">
          <p>Menu</p>
          <p>Message</p>
          <p>Profile</p>
          <p>Profile Setting</p>
          <p>Terms &amp; Condition</p>
        </div>
        <div className="right-middle">
          <p>Our Office</p>
          <p>Jl. Hayam Wuruk no 88, West Jakarta</p>
        </div>
        <div className="right">
          <p>Contact Us</p>
          <p>Email: help@isay.co.id</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
