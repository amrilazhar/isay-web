import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './style/FeedBox.css'

const FeedBox = (fromFeedPage) => {
  //START SHOW AND HIDE COMMENT
  const [show, setShow] = useState(false);

  const oldStatus = fromFeedPage?.oldStatus

  const statusUpdate = useSelector ((state) => state?.statusInterest)

  //START SHOW HIDE COMMENT
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
  //END SHOW AND HIDE COMMENT

  const loadComponent = () => {
    return (
      <>
        <div className="isay-status-box">
          <div className="user-status">
            <div className="upper-prop">
              <div className="user-image-load">
                <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
              </div>
              <div className="name-and-time-load">
              </div>
              <div className="status-interest-load"></div>
            </div>
            <div className="lower-prop-load"></div>
          </div>
          <div className="do-at-status-load"></div>
        </div>
      </>
    )
  }

  if (statusUpdate?.loading) {
    if(oldStatus === null) {
    return (
      <>
        {loadComponent()}
        {loadComponent()}
        {loadComponent()}
      </>
    )}
    return (
      <>
      {loadComponent()}
      {oldStatus?.map((user) => (
      <div className="isay-status-box">
        <div className="user-status">
          <div className="upper-prop">
            <div className="user-image">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
            </div>
            <div className="name-and-time">
              <h2>{user?.owner?.name}</h2>
              <p>{user?.creater_at}</p>
            </div>
            <div className="status-interest">
              <button value={`${user?.interest[0]?._id}`}>{user?.interest[0]?.interest}</button>
            </div>
            <div className="status-location">
              <p><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="Location" />{user?.owner?.location?.city}</p>
            </div>
          </div>
          <div className="lower-prop">
            <p>{user?.content}</p>
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
      ))}
      </>
    )

  } else {
  return (
      <>
      {statusUpdate?.status?.data?.map((user) => (
      <div className="isay-status-box">
        <div className="user-status">
          <div className="upper-prop">
            <div className="user-image">
              <img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/lion__RKncgdq5U.png" alt="User" />
            </div>
            <div className="name-and-time">
              <a href ={`/user/${user?.owner?.id}`}>
                <h2>{user?.owner?.name}</h2>
              </a>
              <p>{user?.creater_at}</p>
            </div>
            <div className="status-interest">
              <button value={`${user?.interest[0]?._id}`}>{user?.interest[0]?.interest}</button>
            </div>
            <div className="status-location">
              <p><img src="https://ik.imagekit.io/alfianpur/Final_Project/Icon/location_vBwnULTngQ.png" alt="Location" />{user?.owner?.location?.city}</p>
            </div>
          </div>
          <div className="lower-prop">
            <p>{user?.content}</p>
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
      ))}
    </>
  )
  }
}

export default FeedBox
