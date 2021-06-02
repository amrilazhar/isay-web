import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, statusInterest, userActions } from '../../redux/actions'
import './style/WriteStatusBox.css'

const WriteStatusBox = (fromFeedPage) => {

  const dispatch = useDispatch()

  const setPage = fromFeedPage?.setPage
  const setOldStatus = fromFeedPage?.setOldStatus
  const setParamInterest = fromFeedPage?.setParamInterest

  const [files, setFiles] = useState("")
  const [content, setContent] = useState("")
  const [interest, setInterest] = useState({
    interest: "Choose Topic",
    id:"",
  })

  console.log("ini files foto", files)

  const statusUpdate = useSelector ((state) => state?.statusInterest)
  const userActive = useSelector ((state) => state?.users)

  const uploadFile = (e) => {
    e.preventDefault()
    if (
      (e?.target?.files[0].type == "image/jpeg" ||
        e?.target?.files[0].type == "image/jpg" ||
        e?.target?.files[0].type == "image/png" ||
        e?.target?.files[0].type == "image/gif" ||
        e?.target?.files[0].type == "image/bmp") &&
      e?.target?.files[0].size / (1024 * 1024) < 1.5
    ){
      setFiles([...files, e?.target?.files[0]])
    } else {
      dispatch(alertActions.error("file exciding maximum size"))
    }
  }

const removeFile = (index) => {
  setFiles(files.filter((i) => i !== index));
};

  const mapImage = () => {
    if (files === ""){
      return (
        <div>
        </div>
        )
    } else {
      return files?.map( (i, x) =>
        <div onClick={() => removeFile(i)} className="img-wrapper" style={{cursor:"pointer"}}>
          <img
            src={URL.createObjectURL(files[x])}
            alt={"upload"}
          />
          <div className="media-overlay">
            <p>delete</p>
          </div>
        </div>
      )
    }
  }  

  const changeText = (e) => {
    setContent(e?.target?.value)
  }

  const interestClick = (e) => {
    e.preventDefault()
    setInterest({
      "interest": [e?.target?.innerText],
      "id": [e?.target?.value]
    })
  }

  const listInterest = () => {
    if(userActive?.loading){
      return(<button>none</button>)
    } else {
      return userActive?.items?.interest?.map (fil =>
        <button onClick={interestClick} value={`${fil?._id}`}>{fil?.interest}</button>
      )
    }
  }

  const submitStatus = (e) => {
    e.preventDefault()
    setOldStatus(statusUpdate?.status?.data)
    setPage (1)
    setParamInterest ({
      "param": ""
    })

    const pagin = 1
    const interestId = interest?.id

    if(content && interestId){
      e.preventDefault()
      dispatch(userActions.postStatus(content, interestId, files))
      e.target.reset()
      const param = ""

      if (!files){
        setTimeout(() => {
          dispatch(statusInterest.getStatus(param, pagin))
        }, 2500)
      } else {
        setTimeout(() => {
          dispatch(statusInterest.getStatus(param, pagin))
        }, 5000)
      }

      setFiles("")

    } else {
      dispatch(alertActions.error("content or interest was empty"))
    }
  }

  const [show, setShow] = useState(false)

  const showModal = (e) => {
    e.preventDefault()
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
          <div className="upper">
            <p>Share your moment to the world!</p>
            <button onClick={showModal} className="close">&times;</button>
          </div>
          <div>
            <input
              type="file"
              name="file"
              id="file"
              className="upload-image"
              onChange={uploadFile}
              multiple
            />
            <label for="file"><strong>Choose your best picture</strong></label>
          </div>
          <div className="img-container">
            {mapImage()}
          </div>
          <div className="himbau">
            <p>*get best experience with image at square ratio</p>
          </div>
          <button onClick={showModal}>Done</button>
        </div>
      </div>
    )}
  }

  return (
    <>
    <div className="status-submit">
      {!userActive?.items?.avatar ? (
        <div className="profile-icon-load">
          <img
            src="https://ik.imagekit.io/alfianpur/Final_Project/Grey_VyVyqnF1h1.png"
            alt="profile-icon"
          />
        </div>
      )
        : (
      <div className="user-active-profile">
        <img src={userActive?.items?.avatar} alt="User" />
      </div>)
      }
      <form onSubmit={submitStatus}>
        <textarea
          wrap="soft"
          type="text"
          name="status"
          id="status"
          placeholder="What do you feel about the world?"
          defaultValue={""}
          onChange={changeText}
        />
        <div className="status-tools">
          <button className="upload" onClick={showModal}>
            { (files === "" || files.length === 0)?
              "Image"
             : 
              `${files.length} Images` 
            }
          </button>
          {modal()}
          <div className="interest-dropdown">
            <input className="choose" value={`${interest?.interest}`} disabled/>
            <div className="dropdown-content">
              {listInterest()}
            </div>
          </div>
          <input type="submit" value="Publish" />
        </div>
      </form>
    </div>
    </>
  )
}

export default WriteStatusBox
