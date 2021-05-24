import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './style/WriteStatusBox.css'

const WriteStatusBox = () => {

  const [files, setFiles] = useState([])

  const [interest, setInterest] = useState({
    interest: "Choose Topic",
    id:"",
  })

  const uploadFile = (e) => {
    e.preventDefault()
    setFiles([...files, e.target.files[0]])
  }

  console.log(files)

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
          <button onClick={showModal} className="close">&times;</button>
          <div>
            <p>Share your moment to the world!</p>
          <input
            type="file"
            name="file"
            id="file"
            className="upload-image"
            onChange={uploadFile}
            multiple
          />
          <label for="file"><strong>Image</strong></label>
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
      <form>
        <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about the world?" defaultValue={""} />
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
