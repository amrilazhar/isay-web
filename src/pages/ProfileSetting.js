import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FlashMessage from '../components/FlashMessage'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { authHeader } from '../helpers'
import { userActions, listAvatar, alertActions } from '../redux/actions'
import './style/ProfileSetting.css'

// ===================================
// CROPPER
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from '../helpers/cropper/cropper.dialog'
import { getCroppedImg, getRotatedImage } from '../helpers/cropper/cropImages'
import { styles } from '../helpers/cropper/cropper-style'


// ===================================

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
    window.location.reload()
  }

  const alert = useSelector ((state) => state.alert)

  const [bioNew, setBioNew] = useState("")
  const [header, setHeader] = useState(null)

  const [sudahPotong, setSudahPotong] = useState(null)

  const changeBio = (e) => {
    setBioNew(e?.target?.value)
  }

  const changeHeader = async (e) => {
    e.preventDefault()
    if (
      (e?.target?.files[0]?.type == "image/jpeg" ||
        e?.target?.files[0]?.type == "image/jpg" ||
        e?.target?.files[0]?.type == "image/png") &&
      e?.target?.files[0]?.size / (1024 * 1024) < 2
    ){
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }

      setHeader(imageDataUrl)
    } else {
      dispatch(alertActions.error("file exciding maximum size"))
    }
  }

  const submitEditBio = (e) => {
    e.preventDefault()
    if(bioNew || header) {
      e.preventDefault()

      dispatch(request(bioNew));

      const formData = new FormData();

      if(bioNew){
        formData.append('bio', `${bioNew}`);
      }

      if(header){
        for (const file of header) {
            formData.append('media', file)
        }
      }

      const requestOptions = {
          method: 'PUT',
          headers: authHeader(),
          body: formData
      };

      fetch(`https://isay.gabatch11.my.id/profile`, requestOptions)
      .then (
        bioNew => dispatch(success(bioNew)),
        error => dispatch(failure(bioNew, error.toString()))
      );

      function request(bioNew) { return { type: "EDIT_BIO_LOADING", bioNew} }
      function success(bioNew) { return { type: "EDIT_BIO_SUCCESS", bioNew } }
      function failure(bioNew, error) { return { type: "EDIT_BIO_FAILURE", bioNew, error } }

      setTimeout(() => {
        dispatch(userActions.getActive())
      }, 2000)

      e.target.reset()

    } else {
      dispatch(alertActions.error("please fill new bio or input new background images"))
    }
  }


// ==========================================
const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}

const Demo = ({ classes }) => {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        header,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [header, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  return (
    <div>
      {header ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={header}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                classes={{ root: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                classes={{ root: classes.slider }}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </Button>
          </div>
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <></>
      )}
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const StyledDemo = withStyles(styles)(Demo)



// ==========================================





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
            <form onSubmit={submitEditBio}>
              <label htmlFor="bio">Bio :</label>
              <textarea
                wrap="soft"
                type="text"
                name="bio"
                id="bio"
                placeholder="write your neew bio"
                defaultValue={""}
                onChange={changeBio}
              />
              <p>Background Images :</p>
              <div className="button-for-upload-header">
                <input
                  type="file"
                  name="backgroundImages"
                  id="backgroundImages"
                  className="upload-image"
                  onChange={changeHeader}
                />
                <label for="backgroundImages">Choose Your Images</label>
              </div>
              <div className="btn">
                <a href="/profile">
                  cancel
                </a>
                <input type="submit" className="save-changes" defaultValue="update" />
              </div>
            </form>
            <div className="reset-btn-wrapper">
              <label>
                <input type="radio" name="mytheme" defaultValue="light" onChange={switchTheme}/>Light
              </label>
              <label>
                <input type="radio" name="mytheme" defaultValue="orange" onChange={switchTheme}/>Orange
              </label>
              <label>
                <input type="radio" name="mytheme" defaultValue="dark" onChange={switchTheme}/>Dark
              </label>
              <label>
                <input type="radio" name="mytheme" defaultValue="coffee" onChange={switchTheme}/>Coffee
              </label>
            </div>
            <div className="reset-btn-wrapper">
              <button onClick={showModalEmailReset} className="reset">Reset Password</button>
            </div>
            {modalEmailReset()}
            {modalAvatarReset()}
          </div>
        </div>
      </div>
    </div>
    <StyledDemo/>
    <Footer/>
    </>
  )
}

export default ProfileSetting
