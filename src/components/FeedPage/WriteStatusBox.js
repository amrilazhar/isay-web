import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './style/WriteStatusBox.css'

const WriteStatusBox = () => {

  const [interest, setInterest] = useState({
    interest: "",
    id:""
  })

  // const interestClick = (e) => {
  //   e.preventDefault()
  //   setInterest({
  //     ""
  //   })
  // }

  const userActive = useSelector ((state) => state.users)

  const listInterest = () => {
    if(userActive.loading){
      return(<div>none</div>)
    } else {
      return userActive.items?.interest.map (fil =>
        <button defaultValue={fil._id}>{fil.interest}</button>
      )
    }
  }

  return (
    <div className="status-submit">
      <div className="user-active-profile">
        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
      </div>
      <form action method="post">
        <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about the world?" defaultValue={""} />
        <div className="status-tools">
          <button><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/picture_Ooor518Yas.png" alt="Add" /> Image</button>
          <div className="interest-dropdown">
            <button className="choose">Choose Topic</button>
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
