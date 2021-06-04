import React from 'react'
import emailogo from "../assets/email.png";
import { history } from '../helpers';
import './style/EmailReminder.css'

const EmailReminder = () => {

  const redirectVeriif = () => {
    history.push('/signupquest/1')
  }

  return (
    <div className="email-verif-container">
      <div className="email-verif-wrapper">
        <div className="notif-verif-email">
          <img src={emailogo} alt="isay logo" />
          <h1>Check your e-mail</h1>
          <p>We already have sent you verification e-mail.</p>
          <p>Please make sure it's verified before you log in.</p>
          <p>But while waiting, you can start filling in some questions.</p>
          <button onClick={redirectVeriif}>Start Filling</button>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default EmailReminder
