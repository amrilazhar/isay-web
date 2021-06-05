import React from 'react'
import IsayLogos from '../assets/isayLogo.js';
import './style/Footer.css'

const Footer = () => {
  const theme = localStorage.getItem('theme')

  return (
    <div className="footer-container">
      <div className="footer-wrapping">
        <div className="left">
          {IsayLogos()}
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
