import React from 'react'
import './style/WriteStatusBox.css'

const WriteStatusBox = () => {
  return (
    <div className="status-submit">
      <div className="user-active-profile">
        <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
      </div>
      <form action method="post">
        <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about me?" defaultValue={""} />
        <div className="status-tools">
          <button>Status</button>
          <button><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/picture_Ooor518Yas.png" alt="Add" /> Image</button>
          <button>Choose Topic</button>
          <input type="submit" defaultValue="Submit" />
        </div>
      </form>
    </div>
  )
}

export default WriteStatusBox
