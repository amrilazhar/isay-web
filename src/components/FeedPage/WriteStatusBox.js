import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './style/WriteStatusBox.css'

const WriteStatusBox = () => {

  const [interest, setInterest] = useState({
    interest: "Choose Topic",
    id:""
  })

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

  return (
    <div className="status-submit">
      <div className="user-active-profile">
        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
      </div>
      <form>
        <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about the world?" defaultValue={""} />
        <div className="status-tools">
          <button><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/picture_Ooor518Yas.png" alt="Add" /> Image</button>
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
  )
}

export default WriteStatusBox
