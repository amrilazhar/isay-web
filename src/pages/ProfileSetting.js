import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { userActions } from '../redux/actions'
import './style/ProfileSetting.css'

const ProfileSetting = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getActive())
  },[])

  const oldProfile = useSelector ((state) => state?.users)

  const previewProfile = () => {
    if (oldProfile) {
      return (
      <>
        <div className="photo">
          <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="user" />
        </div>
        <h1>{oldProfile.items?.name}</h1>
        <div className="location-setting">
          <p>{oldProfile.items?.location?.city}</p>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid obcaecati, aspernatur nam voluptatibus illo, fugiat assumenda recusandae numquam, voluptas eius enim. Accusamus commodi natus totam laborum quam nemo veritatis maiores?</p>
        <div className="interest">
          {(oldProfile.items?.interest?.map(interest =>
            <div className="interest-box">
              <p>{interest?.interest}</p>
            </div>
          ))}
        </div>
      </>
      )
    } else {
      return (
        <>404</>
      )
    }
  }

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState({
    email:""
  })

  const emailChange = (e) => {
    setEmail({
      "email":[e.target.value]
    })
  }

  const submitEmail = (e) => {
    e.preventDefault()
    const emailReset = email.email
    console.log("kirim", emailReset)
    dispatch(userActions.resetPassword(emailReset))
  }

  const showModal = () => {
    if(show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const modal = () => {
    if(show === false) {
      return (<div></div>)
    } else {
    return (
      <div id="resetModal" className="reset-modal">
        <div className="reset-modal-content">
          <button onClick={showModal} className="close">&times;</button>
          <div>
            <p>Are You Sure?</p>
            <form onSubmit={submitEmail}>
              <input type="email" name="email" id="email" placeholder="input your email" defaultValue="" onChange={emailChange}></input>
              <input type="submit" value="Reset" />
            </form>
          </div>
        </div>
      </div>
    )}
  }

  return (
    <>
    <Navbar/>
    <div className="setting-container">
      <div className="setting-wrapping">
        <div className="setting-left">
          <div className="setting-left-wrapper">
            {previewProfile()}
          </div>
        </div>
        <div className="setting-right">
          <div className="setting-right-wrapper">
            <div className="title">
              <h2>Personal Information</h2>
            </div>
            <form>
              <label htmlFor="bio">Bio :</label>
              <textarea wrap="soft" type="text" name="bio" id="bio" placeholder="write your neew bio" defaultValue={""} />
              <label htmlFor="location">Location :</label>
              <input type="text" name="location" id="location" placeholder="update your location" />
              <div className="btn">
                <a href="/profile">
                  cancel
                </a>
                <input type="submit" defaultValue="update" />
              </div>
            </form>
            <button onClick={showModal} className="reset">Reset Password</button>
            {modal()}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProfileSetting
