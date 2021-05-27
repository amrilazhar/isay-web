import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { userActions, listAvatar } from '../redux/actions'
import './style/ProfileSetting.css'

const ProfileSetting = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getActive())
  },[])

  useEffect(() => {
    dispatch(listAvatar.listAvatarGet())
  },[])

  const oldProfile = useSelector ((state) => state?.users)
  const getListAvatar = useSelector ((state) => state?.listAvatar)

  const [showModalAvatar, setShowModalAvatar] = useState(false)
  const [avatar, setAvatar] = useState("")

  const avatarChange = (e) => {
    setAvatar(e.target.value)
  }

  const submitAvatar = (e) => {
    e.preventDefault()
    const choosenAvatar = avatar
    // dispatch(userActions.resetPassword(emailReset))
  }

  const showModalAvatarChange = () => {
    if(showModalAvatar === false) {
      setShowModalAvatar(true)
    } else {
      setShowModalAvatar(false)
    }
  }

  const modalAvatarReset = () => {
    if(showModalAvatar === false) {
      return (<div></div>)
    } else {
    return (
      <div id="resetModal" className="reset-modal">
        <div className="reset-modal-content">
          <button onClick={showModalAvatarChange} className="close">&times;</button>
          <div>
            <p>Are You Sure?</p>
            <div className="avatar-container">
                {(getListAvatar?.listAvatar?.map(avatar =>
                  <button>
                    <div className="avatar-wrap">
                      <img src={avatar} alt="user" />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    )}
  }

  const previewProfile = () => {
    if (oldProfile) {
      return (
      <>
        <div className="photo">
          <img src={oldProfile?.items?.avatar} alt="user" />
          <div className="photo-overlay">
            <div className="edit-cont" onClick={showModalAvatarChange}>
              <p>Change Avatar</p>
            </div>
          </div>
        </div>
        <h1>{oldProfile.items?.name}</h1>
        <div className="location-setting">
          <p>{oldProfile.items?.location?.city}</p>
        </div>
        <p>{oldProfile?.items?.bio}</p>
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
    dispatch(userActions.resetPassword(emailReset))
  }

  const showModalEmailReset = () => {
    if(show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const modalEmailReset = () => {
    if(show === false) {
      return (<div></div>)
    } else {
    return (
      <div id="resetModal" className="reset-modal">
        <div className="reset-modal-content">
          <button onClick={showModalEmailReset} className="close">&times;</button>
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
            <button onClick={showModalEmailReset} className="reset">Reset Password</button>
            {modalEmailReset()}
            {modalAvatarReset()}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProfileSetting
