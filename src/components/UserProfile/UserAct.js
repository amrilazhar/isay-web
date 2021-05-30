import React from 'react'
import './style/UserAct.css'

const UserAct = () => {
  return (
    <div className="realtime-feed-act">
      <div className="isay-status-box">
        <div className="header-activity">
          <div className="header-line-one">
            <p>Raflesia Arnoldi</p>
            <p>Commented on this post</p>
            <div className="status-interest">
              <p>Personal</p>
            </div>
          </div>
          <p>One Hour Ago</p>
        </div>
        <div className="isay-status-rec">
          <div className="user-status">
            <div className="upper-prop">
              <div className="user-image">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
              </div>
              <div className="name-and-time">
                <h2>Raflesia Arnoldi</h2>
                <p>1 hour ago</p>
              </div>
              <div className="location">
                <p><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="Location" />Jakarta</p>
              </div>
            </div>
            <div className="lower-prop">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eaque officia eligendi, distinctio
                perferendis odio minima dignissimos adipisci error nam, non libero quae quod, ipsum praesentium dolore
                consectetur quas aliquam?</p>
              <div className="image-post">
                <div className="image-cont">
                  <img src="https://ik.imagekit.io/alfianpur/Personal_Pages/design_fP0B76kJ-16.jpg" alt="PostMage" />
                </div>
                <div className="image-cont">
                  <img src="https://ik.imagekit.io/alfianpur/Personal_Pages/design_fP0B76kJ-16.jpg" alt="PostMage" />
                </div>
              </div>
            </div>
          </div>
          <div className="do-at-status">
            <div className="button-collect">
              <div className="button">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/like_DeUkMSVa0GD.png" alt="Like" />
                <p>Like</p>
                <p>(3)</p>
              </div>
              <div className="button">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/comment_pfnyK8aWL.png" alt="Comment" />
                <p>Comments</p>
                <p>(15)</p>
              </div>
              <div className="button">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/chat_k1YWihxxc.png" alt="PC" />
                <p>Personal Chat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination" />
    </div>
  )
}

export default UserAct
