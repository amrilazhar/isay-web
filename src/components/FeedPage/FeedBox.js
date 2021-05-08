import React, { useState } from 'react'
import './style/FeedBox.css'

const FeedBox = (proper) => {

  const [show, setShow] = useState(false);

  const changeShow = () => {
    if (show === false) {
      setShow(true);
    }
    else if (show === true) {
      setShow(false);
    }
  }

  const CommentExpand = () => {
    if (show === true) {
      return (
        <div className="comment-expand">
          <form action method="post">
            <textarea wrap="soft" type="text" name="status" id="status" placeholder="What do you feel about me?" defaultValue={""} />
          </form>
          <div className="comment-box">
            <div className="comment-detail">
              <h2>Rafflesia Arnoldi</h2>
              <p>3h ago</p>
            </div>
            <div className="comment-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quisquam nobis alias natus nam dignissimos, recusandae quasi aspernatur maxime similique molestiae aut magni eius voluptates modi hic suscipit incidunt quae.</p>
            </div>
          </div>
          <div className="comment-box">
            <div className="comment-detail">
              <h2>Rafflesia Arnoldi</h2>
              <p>3h ago</p>
            </div>
            <div className="comment-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quisquam nobis alias natus nam dignissimos,
                recusandae quasi aspernatur maxime similique molestiae aut magni eius voluptates modi hic suscipit incidunt quae.
              </p>
            </div>
          </div>
        </div>
      )
    } else {return (<div></div>)}
  }
  
  const card = proper.cardy;

  return (
    <div className="isay-status-box">
      <div className="user-status">
        <div className="upper-prop">
          <div className="user-image">
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
          </div>
          <div className="name-and-time">
            <h2>{card.name}</h2>
            <p>1 hour ago</p>
          </div>
          <div className="status-interest">
            <p>Personal</p>
          </div>
          <div className="location">
            <p><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="Location" />Jakarta</p>
          </div>
        </div>
        <div className="lower-prop">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eaque officia eligendi, distinctio perferendis odio minima dignissimos adipisci error nam, non libero quae quod, ipsum praesentium dolore consectetur quas aliquam?</p>
        </div>
      </div>
      <div className="do-at-status">
        <div className="button-collect">
          <div className="button">
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/like_DeUkMSVa0GD.png" alt="Like" />
            <p>Like</p>
            <p>(3)</p>
          </div>
          <div className="button" onClick={changeShow}>
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/comment_pfnyK8aWL.png" alt="Comment" />
            <p>Comments</p>
            <p>(15)</p>
          </div>
          <div className="button">
            <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/chat_k1YWihxxc.png" alt="PC" />
            <p>Personal Chat</p>
          </div>
        </div>
        {CommentExpand()}
      </div>
    </div>
  )
}

export default FeedBox
