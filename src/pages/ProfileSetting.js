import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FlashMessage from '../components/FlashMessage'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { authHeader } from '../helpers'
import { userActions, listAvatar, alertActions } from '../redux/actions'
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

  const submitAvatar = () => {
    dispatch(request(avatar));

    const requestOptions = {
        method: 'PUT',
        headers: authHeader()
    };

    fetch(`https://isay.gabatch11.my.id/profile/changeAvatar/${avatar}`, requestOptions)
    .then(
        avatar => {
          dispatch(success(avatar))
          dispatch(alertActions.success('Avatar Changed'));
        },
        error => {
          dispatch(failure(avatar, error.toString()))
          dispatch(alertActions.error(error.toString()));
        }
    );

    function request(avatar) { return { type: "AVATAR_RESET_LOADING", avatar} }
    function success(avatar) { return { type: "AVATAR_RESET_SUCCESS", avatar } }
    function failure(avatar, error) { return { type: "AVATAR_RESET_FAILURE", avatar, error } }

    setTimeout(() => {
      dispatch(userActions.getActive())
    }, 2000)
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
          <div className="modal-flexin">
            <p>Are You Sure?</p>
            <div className="avatar-container">
              {(getListAvatar?.listAvatar?.map((avatar, key) =>
                <>
                  <input
                    type="radio"
                    name="avatar"
                    for={key}
                    id={key}
                    defaultValue={key}
                    onChange={avatarChange}
                  />
                  <label
                    htmlFor={key}
                    id={key}
                  >
                    <div className="avatar-wrap">
                      <img src={avatar} alt="user" />
                    </div>
                  </label>
                </>
              ))}
            </div>
            <button onClick={submitAvatar}>Give Me New Avatar</button>
          </div>
        </div>
      </div>
    )}
  }

  const previewProfile = () => {
    return (
    <>
      <div className="photo">
        { (oldProfile?.items?.avatar)?
            <img src={oldProfile?.items?.avatar} alt="user" />:
            <></>
        }
        <div className="photo-overlay">
          <div className="edit-cont" onClick={showModalAvatarChange}>
            <p>Change Avatar</p>
          </div>
        </div>
      </div>
      { (oldProfile.loading === false)?
      <>
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
      :
      <>
      <div className="lazy-load-setting"
        style = {{
          width: "12rem",
          height: "3rem",
          borderRadius:"1.5rem"
        }}
      ></div>
      <div className="lazy-load-setting"
        style = {{
          width: "6rem",
          height: "2rem",
          borderRadius:"0.8rem"
        }}></div>
      <div className="lazy-load-setting"
        style = {{
          width: "14rem",
          height: "1.4rem",
          borderRadius:"0.8rem"
        }}></div>
      <div className="lazy-load-setting"
        style = {{
          width: "18rem",
          height: "2rem",
          borderRadius:"0.8rem"
        }}></div>
      </>
      }
    </>
    )
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


  function setTheme (themeName) {
    localStorage.setItem ('theme', themeName)
  }

  const switchTheme = (e) => {
    setTheme(e?.target?.defaultValue)
  }

  const alert = useSelector ((state) => state.alert)

  return (
    <>
    {
      alert.alert ? <FlashMessage/> : ""
    }
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
            <div className="reset-btn-wrapper">
              <button onClick={showModalEmailReset} className="reset">Reset Password</button>
            </div>
            {modalEmailReset()}
            {modalAvatarReset()}
            <div className="reset-btn-wrapper">
              <label>
                <input type="radio" name="mytheme" defaultValue="light" onChange={switchTheme}/>Light
              </label>
              <label>
                <input type="radio" name="mytheme" defaultValue="orange" onChange={switchTheme}/>orange
              </label>
              <label>
                <input type="radio" name="mytheme" defaultValue="dark" onChange={switchTheme}/>Dark
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProfileSetting
