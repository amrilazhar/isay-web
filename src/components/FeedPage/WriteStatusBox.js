import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../redux/actions'
import './style/WriteStatusBox.css'

const WriteStatusBox = () => {

  const dispatch = useDispatch()

  const [files, setFiles] = useState("")
  const [content, setContent] = useState("")
  const [interest, setInterest] = useState({
    interest: "Choose Topic",
    id:"",
  })

  const uploadFile = (e) => {
    e.preventDefault()
    setFiles([...files, e.target.files[0]])
  }

  const mapImage = () => {
    if (files === ""){
      return (
        <div className="img-wrapper">
          <img src={"https://ik.imagekit.io/alfianpur/Final_Project/Rectangle_71_HTxe4aLXT.png"}/>
        </div>
        )
    } else {
      return files?.map( (i, x) =>
      <div className="img-wrapper">
        <img src={URL.createObjectURL(files[x])}/>
      </div>
        )
    }
  }  

  const changeText = (e) => {
    setContent(e?.target.value)
  }

  const interestClick = (e) => {
    e.preventDefault()
    setInterest({
      "interest": [e?.target?.innerText],
      "id": [e?.target?.value]
    })
  }

  const userActive = useSelector ((state) => state.users)

  const listInterest = () => {
    if(userActive.loading){
      return(<button>none</button>)
    } else {
      return userActive.items?.interest.map (fil =>
        <button onClick={interestClick} value={`${fil?._id}`}>{fil.interest}</button>
      )
    }
  }

  const submitStatus = (e) => {
    if(content && interest){
      e.preventDefault()
      dispatch(userActions.postStatus(content, interest))
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
        </div>
      </div>
    )}
  }

  return (
    <>
    <div className="status-submit">
      <div className="user-active-profile">
        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
      </div>
      <form onSubmit={submitStatus}>
        <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about the world?" defaultValue={""} onChange={changeText}/>
        <div className="status-tools">
          <button onClick={showModal}>Upload Image</button>
          {modal()}
          <div className="interest-dropdown">
            <input className="choose" value={`${interest.interest}`}/>
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
